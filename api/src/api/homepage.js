const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');

const HomePage = require('../models/homepage');

// Get one homepage object
router.get(
  '/',
  errorWrap(async (req, res) => {
    const homePageObject = await HomePage.findOne();
    res.json({
      code: 200,
      message: `Successfully returned HomePage object`,
      success: true,
      result: homePageObject,
    });
  }),
);

module.exports = router;
