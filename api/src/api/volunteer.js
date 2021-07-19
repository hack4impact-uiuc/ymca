const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');

const Category = require('../models/category');
const Resource = require('../models/resource');
const HomePage = require('../models/homepage');
const Translation = require('../models/translation');
const VerifiedTranslation = require('../models/verifiedTranslation');
const {
  getVerifiedAggregation,
  getNestedVerifiedAggregation,
  getVerificationDetails,
} = require('../utils/verification');

// Get verified translations for table
router.get(
  '/verified',
  errorWrap(async (req, res) => {
    const { language } = req.query;
    const resourceInfo = await Resource.aggregate(
      getVerifiedAggregation(language, 'resourceID', 'resource'),
    );
    const categoryInfo = await Category.aggregate(
      getVerifiedAggregation(language, 'categoryID', 'category'),
    );
    const subcategoryInfo = await Category.aggregate(
      getNestedVerifiedAggregation(
        language,
        'subcategoryID',
        'subcategory',
        'subcategories',
        'name',
      ),
    );
    const testimonialInfo = await HomePage.aggregate(
      getNestedVerifiedAggregation(
        language,
        'testimonialID',
        'testimonial',
        'testimonials',
        'person',
      ),
    );

    res.json({
      code: 200,
      message: 'Successfully returned verified translation table info',
      success: true,
      result: resourceInfo.concat(
        categoryInfo,
        subcategoryInfo,
        testimonialInfo,
      ),
    });
  }),
);

// Get verified translations for an ID
router.get(
  '/verified/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const { language, type } = req.query;

    const verificationDetails = await getVerificationDetails(
      type,
      language,
      id,
    );
    const { messages } = await Translation.findOne({
      language: { $eq: language },
    });
    verificationDetails.forEach((verificationObject) => {
      const key = Object.keys(verificationObject)[0];
      verificationObject[key][language] = messages.get(key);
    });

    res.json({
      code: 200,
      message: 'Successfully returned verified translation info',
      success: true,
      result: verificationDetails,
    });
  }),
);

// Update verified translations for an ID
router.put(
  '/verified',
  errorWrap(async (req, res) => {
    const { language, type } = req.query;
    const { translations } = req.body;

    const translationsToUpdate = await Translation.findOne({
      language: { $eq: language },
    });
    translations.forEach(async (translation) => {
      const key = Object.keys(translation)[0];
      translationsToUpdate.messages.set(key, translation[key][language]);
      const verifiedTranslation = await VerifiedTranslation.updateOne(
        {
          translationID: key,
          language,
        },
        { $set: { verified: translation[key].verified } },
      );
    });
    await translationsToUpdate.save();

    res.json({
      code: 200,
      message: 'Successfully updated verified translation info',
      success: true,
      result: null,
    });
  }),
);

module.exports = router;
