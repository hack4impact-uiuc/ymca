const express = require('express');
const router = express.Router();
const errorWrap = require('../middleware/errorWrap');
const Resource = require('../models/resource');

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
