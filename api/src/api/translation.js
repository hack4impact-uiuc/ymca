const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Translation = require('../models/translation');

// Get translations of specified language
router.get(
  '/',
  errorWrap(async (req, res) => {
    const { language } = req.query;
    let translations;
    if (language != null) {
      translations = await Translation.find({ language: { $eq: language } });
    } else {
      res.json({
        code: 400,
        message: 'langauge is set to null',
        success: false,
        result: null,
      });
    }
    res.json({
      code: 200,
      message: '',
      success: true,
      result: translations,
    });
  }),
);

module.exports = router;
