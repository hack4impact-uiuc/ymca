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

  const updatedTranslation = await Translation.findOne({
    language: { $eq: myDictionary[languageType] },
  });
  translatedResourceDescriptions.forEach(function (value, key, map) {
    updatedTranslation.messages.set(key, value);
  });
  await updatedTranslation.save();
}
main();
