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

module.exports = router;
