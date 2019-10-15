const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Resource = require('../models/resource');

// Get all resources (with query param "category")
router.get(
  '/',
  errorWrap(async (req, res) => {
    const { category } = req.query;
    let resources;
    if (category != null) {
      resources = await Resource.find({ category });
    } else {
      resources = await Resource.find();
    }
    res.json({
      code: 200,
      message: '',
      success: true,
      result: resources,
    });
  }),
);

// Get a resource by id
router.get(
  '/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const resource = await Resource.findById(id);
    if (resource === null) {
      res.status(400).json({
        code: 400,
        message: `Cannot find resource ${id}`,
        success: false,
        result: null,
      });
    }
    res.json({
      code: 200,
      message: `Successfully found resource ${id}`,
      success: true,
      result: resource,
    });
  }),
);

// Create a new resource
router.post(
  '/',
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
  '/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
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
  '/:id',
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

module.exports = router;
