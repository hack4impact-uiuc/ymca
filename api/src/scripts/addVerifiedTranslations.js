const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const fetch = require('isomorphic-unfetch');
const Resource = require('../models/resource');
const Translation = require('../models/translation');
const VerifiedTranslation = require('../models/verifiedTranslation');
const Category = require('../models/category');
const verifiedTranslation = require('../models/verifiedTranslation');
const HomePage = require('../models/homepage');

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

  const translations = await Translation.find({});

  const categories = await Category.find({});
  for (const translation of translations) {
    for (const category of categories) {
      const verified = new VerifiedTranslation({
        categoryID: category._id,
        translationID: `category-${category.name}`.replace(/\s/g, ''),
        verified: false,
        numReports: 0,
        language: translation.language,
      });
      await verified.save();
      for (const subcategory of category.subcategories) {
        const verifiedSub = new VerifiedTranslation({
          subcategoryID: subcategory._id,
          translationID: `subcategory-${subcategory.name}`.replace(/\s/g, ''),
          verified: false,
          numReports: 0,
          language: translation.language,
        });
        await verifiedSub.save();
      }
    }
  }

  const homepage = await HomePage.findOne({});
  for (const translation of translations) {
    for (const testimonial of homepage.testimonials) {
      const verified = new VerifiedTranslation({
        testimonialID: testimonial._id,
        translationID: `testimonial-${testimonial.person}-${testimonial.title}`
          .toLowerCase()
          .replace(/\s/g, ''),
        verified: false,
        numReports: 0,
        language: translation.language,
      });
      await verified.save();
    }
  }

  const resources = await Resource.find({});
  for (const translation of translations) {
    for (const resource of resources) {
      const {
        _id,
        description,
        phoneNumbers,
        eligibilityRequirements,
        financialAidDetails,
        requiredDocuments,
      } = resource;
      const verifiedDesc = new VerifiedTranslation({
        resourceID: _id,
        translationID: `resource-description-${_id}`,
        verified: false,
        numReports: 0,
        language: translation.language,
      });
      await verifiedDesc.save();

      if (phoneNumbers !== null && phoneNumbers !== undefined && phoneNumbers.length !== 0) {
        for (const phone of phoneNumbers) {
          const verifiedPhone = new VerifiedTranslation({
            resourceID: _id,
            translationID: `resource-phoneType-${phone._id}`,
            verified: false,
            numReports: 0,
            language: translation.language,
          });
          await verifiedPhone.save();
        }
      }
      if (eligibilityRequirements ) {
        const verifiedElig = new VerifiedTranslation({
          resourceID: _id,
          translationID: `resource-eligibilityRequirements-${_id}`,
          verified: false,
          numReports: 0,
          language: translation.language,
        });
        await verifiedElig.save();
      }
      if (financialAidDetails !== null && financialAidDetails !== undefined) {
        for (const financialKey of Object.keys(financialAidDetails.toJSON())) {
          if (financialKey !== '_id') {
            const verifiedFin = new VerifiedTranslation({
              resourceID: _id,
              translationID: `resource-financialAid-${financialKey}-${financialAidDetails._id}`,
              verified: false,
              numReports: 0,
              language: translation.language,
            });
            await verifiedFin.save();
          }
        }
      }
      if (requiredDocuments !== null && requiredDocuments !== undefined && requiredDocuments.length > 0) {
        for (let i = 0; i < requiredDocuments.length; i++) {
          const verifiedDoc = new VerifiedTranslation({
            resourceID: _id,
            translationID: `resource-requiredDoc-${_id}-${i}`,
            verified: false,
            numReports: 0,
            language: translation.language,
          });
          await verifiedDoc.save(); 
        }
      }
    }
  }
}
main();
