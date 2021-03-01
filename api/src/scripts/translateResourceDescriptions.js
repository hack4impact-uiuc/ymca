/**
 * There are a few pieces of text (listed here https://www.notion.so/Extended-PRD-3871269d960c4435a43396d0bcbf9e9b#5cf2113c2e2e4dd6a638847590432d42)
 * that we want to translate - let's just start with Resource descriptions first, and we can go from there.
 *
 * You can run this script by going to the api/src/scripts directory and running `node translateResourceDescriptions`
 */

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Connecting to our *dev* database - we can change this later once we're confident the script works
dotenv.config({
  path: path.resolve(__dirname, `../../config/dev.env`),
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

mongoose.connection
  .once('open', () => console.log('Connected to MongoDB instance.'))
  .on('error', (error) => console.log('Error connecting to MongoDB:', error));
