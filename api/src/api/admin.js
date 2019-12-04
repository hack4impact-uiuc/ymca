const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Category = require('../models/category');
const Resource = require('../models/resource');

// Create a new resource
router.post(
  '/resources',
  errorWrap(async (req, res) => {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.status(201).json({
      code: 201,
      message: `Successfully created new resource ${newResource.id}`,
      success: true,
      result: newResource,
    });
  }),
);

// Edit an existing resource
router.put(
  '/resources/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      code: 200,
      message: `Successfully updated resource ${id}`,
      success: true,
      result: updatedResource,
    });
  }),
);

// Delete resource by ID
router.delete(
  '/resources/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    await Resource.findByIdAndDelete(id);
    res.json({
      code: 200,
      message: `Successfully deleted resource ${id}`,
      success: true,
      result: null,
    });
  }),
);

// Create a new category
router.post(
  '/categories',
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
