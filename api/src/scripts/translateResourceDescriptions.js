/**
 * There are a few pieces of text (listed here https://www.notion.so/Extended-PRD-3871269d960c4435a43396d0bcbf9e9b#5cf2113c2e2e4dd6a638847590432d42)
 * that we want to translate - let's just start with Resource descriptions first, and we can go from there.
 *
 * You can run this script by going to the api/src/scripts directory and running `node translateResourceDescriptions [language]`
 * Language can be any of "es" (Spanish), "fr" (French), or "zh" (Simplified Chinese)
 */

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const fetch = require('isomorphic-unfetch');
const Resource = require('../models/resource');
const Translation = require('../models/translation');

const myDictionary = {
  es: 'Spanish',
  fr: 'French',
  zh: 'Chinese',
};

async function main() {
  // Connecting to our *dev* database - we can change this later once we're confident the script works
  dotenv.config({
    path: path.resolve(__dirname, `../../config/production.env`),
  });

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.Promise = global.Promise;

  mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance.'))
    .on('error', (error) => console.log('Error connecting to MongoDB:', error));
  /**
   * Step 1: Get the descriptions of every Resource in our database
   */
  // Change this to get just the descriptions and their associated resource `_id` - so we have an array of objects with fields _id and description
  let resourceDescriptions = await Resource.find(
    {},
    { _id: 1, description: 1 },
  );
  /**
   * Step 2: Call the Google API to translate those descriptions to the target language
   *
   * Essentially we want to feed in our array from step 1 into the google API, and save an array of objects with fields _id and translated text
   *
   * https://cloud.google.com/translate/docs/reference/rest/v2/translate - this is the POST request we want
   * We can make the POST request using `fetch` - you can look in client/src/utils/auth.js for examples
   * Make sure to specify the `source` as "en"
   * https://stackoverflow.com/questions/35139572/sample-code-for-google-translate-api - this may help on how to format the request URL
   *
   * For now, you can go ahead and write this code, but I'll supply the API key later (basically, I don't want to waste API credits) - to test Step 3,
   * you can mock out the resultant data to feed into Step 3
   */
  const apiKey = '';
  // map ids of resources to translated descriptions
  var translatedResourceDescriptions = new Map();
  const languageType = process.argv.slice(2)[0]; // the language specified in the argument when running the script - the "target" argument in the POST request
  for (let resource of resourceDescriptions) {
    var id = resource._id;
    var descriptionText = resource.description;
    var source =
      `https://www.googleapis.com/language/translate/v2?key=${apiKey}&source=en&target=${languageType}&callback=translateText&q=` +
      descriptionText;

    source = encodeURI(source);
    const res = await fetch(source, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJSON = await res.json();
    translatedResourceDescriptions.set(
      `resource-description-${id}`,
      responseJSON.data.translations[0].translatedText,
    );
  }
  /*await resourceDescriptions.forEach(async function (resource) {
    var id = resource._id;
    var descriptionText = resource.description;
    var source =
      `https://www.googleapis.com/language/translate/v2?key=${apiKey}&source=en&target=${languageType}&callback=translateText&q=` +
      descriptionText;
    const res = await fetch(source, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJSON = await res.json();
    translatedResourceDescriptions.set(
      `resource-description-${id}`,
      responseJSON.data.translations[0].translatedText,
    );
  }); */
  console.log(translatedResourceDescriptions);

  //body.data.translations[0].translatedText
  /**
   * Step 3: Store those translations back into our database
   *
   * You can look at our model for a translation - essentially, a "Translation" has a field "language" and then a field "messages" which is a Map of strings to other strings
   * This is the "message ID" to its translation, so for example, if a resource had _id "1234", and translation "hola" for its description, after entering that into our db,
   * the resulting db entry might look like:
   * {
   *  language: "es",
   *  messages: {
   *      "resource-description-6789": "gracias",
   *      "resource-description-1234": "hola"
   *  }
   * }
   *
   * We want to loop over our results from Step 2, and enter all of those into our database in the format above ^
   */
  // Here we can use some update function on our model `Translation` (already imported) - you can look at the PUT request for /translation in api/admin.js for how to do this

  const updatedTranslation = await Translation.findOne({
    language: { $eq: myDictionary[languageType] },
  });
  console.log(updatedTranslation);
  // updatedTranslation.messages.set('resource-description-5eba229c29c48c083c6b19ef', 'Hola');
  translatedResourceDescriptions.forEach(function (value, key, map) {
    console.log(key);
    updatedTranslation.messages.set(key, value);
  });
  console.log(updatedTranslation);
  await updatedTranslation.save();
}
main();
