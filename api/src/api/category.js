const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Category = require('../models/category');

// Get all categories
router.get(
  '/',
  errorWrap(async (req, res) => {
    const categories = await Category.find();
    res.json({
      code: 200,
      message: '',
      success: true,
      result: categories,
    });
  }),
);

module.exports = router;
