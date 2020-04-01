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
      resources = await Resource.find({ category: { $in: category } });
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
    const { requireLatLong } = req.query;
    let resource = await Resource.findById(id);

    if (resource === null) {
      res.status(400).json({
        code: 400,
        message: `Cannot find resource ${id}`,
        success: false,
        result: null,
      });
    }

    if (requireLatLong) {
      try {
        const apiLatLong =
          `https://www.mapquestapi.com/geocoding/v1/address?key=` +
          `${process.env.MAPBOX_KEY}&maxResults=5&location=${resource.address},${resource.city},${resource.state},${resource.zip}`;
        const response = await fetch(apiLatLong, {});
        const responseJson = await response.json();

        if (responseJson.info.statuscode === 0) {
          resource = {
            ...resource._doc,
            ...responseJson.results[0].locations[0].latLng,
          };
        }
      } catch (err) {
        // in case there is no loction params filled from the form.
      }
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
