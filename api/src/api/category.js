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

// Create a new category
router.post(
  '/',
  errorWrap(async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({
      code: 201,
      message: `Successfully created new category ${newCategory.id}`,
      success: true,
      result: newCategory,
    });
  }),
);

module.exports = router;
