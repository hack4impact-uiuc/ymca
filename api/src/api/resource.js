const express = require('express')
const router = express.Router()
const { Resource } = require('../models')

// Get all resources
router.get(
    '/',
    errorWrap(async (req, res) => {
        const resources = await Resource.find()
        res.send(resources.toJSON())
    })
)

// Get resources by category
router.get(
    '/:category',
    errorWrap(async (req, res) => {
        const categoryName = req.params.category
        const resources = await Resource.find({ category: categoryName })
        res.send(resources.toJSON())
    })
)

// Delete resource by ID
router.delete(
    '/:id',
    errorWrap(async (req, res) => {
      const resourceId = req.params.id;
      try {
        const Resource = await Resource.findByIdAndDelete(resourceId)
        res.send({ code: 200, success: true })
      }
      catch {

      }
    })
)