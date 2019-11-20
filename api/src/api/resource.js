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

module.exports = router;
