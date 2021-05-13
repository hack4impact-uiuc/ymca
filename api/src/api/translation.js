const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const resource = require('../models/resource');
const Translation = require('../models/translation');
const VerifiedTranslation = require('../models/verifiedTranslation');

// Get translations of specified language
router.get(
  '/',
  errorWrap(async (req, res) => {
    const { language } = req.query;
    let translations;
    if (language != null) {
      translations = await Translation.findOne({ language: { $eq: language } });
      res.json({
        code: 200,
        message: '',
        success: true,
        result: translations,
      });
    } else {
      res.json({
        code: 400,
        message: 'Null language provided',
        success: false,
        result: null,
      });
    }
  }),
);

// Get if a resource has unverified translations
router.get(
  '/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const { language } = req.query;

    const resourceTranslations = await VerifiedTranslation.find({
      resourceID: id,
      language,
    });
    const isVerified = !resourceTranslations.some(
      (translation) => translation.verified === false,
    );

    res.json({
      code: 200,
      message: 'Successfully reported an error',
      success: true,
      result: isVerified,
    });
  }),
);

// Report a translation error for an ID
router.patch(
  '/report/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const { language, type } = req.body;

    const updateQuery = { $inc: { numReports: 1 } };

    switch (type) {
      case 'resource':
        await VerifiedTranslation.updateOne(
          {
            resourceID: id,
            language,
          },
          updateQuery,
        );
        break;
      case 'category':
        await VerifiedTranslation.updateOne(
          {
            categoryID: id,
            language,
          },
          updateQuery,
        );
        break;
      case 'subcategory':
        await VerifiedTranslation.updateOne(
          {
            subcategoryID: id,
            language,
          },
          updateQuery,
        );
        break;
      case 'testimonial':
        await VerifiedTranslation.updateOne(
          {
            testimonialID: id,
            language,
          },
          updateQuery,
        );
        break;
      default:
        res.json({
          code: 400,
          message: 'Could not find specified type',
          success: false,
          result: null,
        });
    }

    res.json({
      code: 200,
      message: 'Successfully reported an error',
      success: true,
      result: null,
    });
  }),
);

module.exports = router;
