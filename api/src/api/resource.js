const express = require('express');
const router = express.Router();
const errorWrap = require('../middleware/errorWrap');
const Resource = require('../models/resource');

// Get all resources
router.get(
  '/',
  errorWrap(async (req, res) => {
    const resources = await Resource.find();
    res.send(resources.toJSON());
  }),
);

// Get resources by category
router.get(
  '/:category',
  errorWrap(async (req, res) => {
    const categoryName = req.params.category;
    const resources = await Resource.find({ category: categoryName });
    res.send(resources.toJSON());
  }),
);

// Delete resource by ID
router.delete(
  '/:id',
  errorWrap(async (req, res) => {
    const resourceId = req.params.id;
    try {
      const Resource = await Resource.findByIdAndDelete(resourceId);
      res.send({ code: 200, success: true });
    } catch {}
  }),
);
// Get a resource by id
router.get(
  '/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const resource = await Resource.findById(id);
    res.send(resource.toJSON());
  }),
);

// Create a new resource
router.post(
  '/',
  errorWrap(async (req, res) => {
    const resource = Resource.build(req.body);
    const newResource = await resource.save();
    res.status(201).send(newResource);
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
    res.send(updatedResource);
  }),
);

module.exports = router;
