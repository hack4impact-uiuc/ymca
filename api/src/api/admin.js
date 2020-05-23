const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Category = require('../models/category');
const Resource = require('../models/resource');
const HomePage = require('../models/homepage');

const imageHelper = async image => {
  const imageResponse = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Client-ID ${process.env.IMGUR_KEY}`,
    },
    body: JSON.stringify({
      image: image.replace('data:image/jpeg;base64,', ''),
      type: 'image/base64',
    }),
  });
  const imageResponseJSON = await imageResponse.json();
  if (imageResponseJSON.status === 200) {
    return imageResponseJSON.data.link;
  }
  return null;
};

asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

// Create a homepage object
router.post(
  '/homepage',
  errorWrap(async (req, res) => {
    if (req.body.backgroundImageRaw && req.body.backgroundImageRaw.length > 0) {
      const link = await imageHelper(req.body.backgroundImageRaw);
      if (link) {
        req.body.backgroundImage = link;
      }
    }
    if (req.body.testimonialImages) {
      await asyncForEach(Object.keys(req.body.testimonialImages), async key => {
        const link = await imageHelper(req.body.testimonialImages[key]);
        if (link) {
          req.body.testimonials[key][1] = link;
        }
      });
    }
    if (req.body.partnerImages) {
      await asyncForEach(Object.keys(req.body.partnerImages), async key => {
        const link = await imageHelper(req.body.partnerImages[key]);
        if (link) {
          req.body.partners[key][1] = link;
        }
      });
    }
    const newHomePage = new HomePage(req.body);
    await newHomePage.save();
    res.json({
      code: 200,
      message: `Succesfully created new HomePage object`,
      success: true,
      result: newHomePage,
    });
  }),
);

// Edit homepage object
router.put(
  '/homepage',
  errorWrap(async (req, res) => {
    if (req.body.backgroundImageRaw && req.body.backgroundImageRaw.length > 0) {
      const link = await imageHelper(req.body.backgroundImageRaw);
      if (link) {
        req.body.backgroundImage = link;
      }
    }
    if (req.body.testimonialImages) {
      console.log('here');
      await asyncForEach(Object.keys(req.body.testimonialImages), async key => {
        const link = await imageHelper(req.body.testimonialImages[key]);
        if (link) {
          req.body.testimonials[key][1] = link;
        }
      });
    }
    if (req.body.partnerImages) {
      await asyncForEach(Object.keys(req.body.partnerImages), async key => {
        const link = await imageHelper(req.body.partnerImages[key]);
        if (link) {
          req.body.partners[key][1] = link;
        }
      });
    }
    const homePageObject = await HomePage.findOne();
    homePageObject.backgroundImage = req.body.backgroundImage;
    homePageObject.testimonials = req.body.testimonials;
    homePageObject.partners = req.body.partners;
    homePageObject.save();
    res.json({
      code: 200,
      message: `Successfully updated homepage`,
      success: true,
    });
  }),
);

// Delete all homepage objects
router.delete(
  '/homepage',
  errorWrap(async (req, res) => {
    await HomePage.deleteMany({}, function(err) {
      console.log(err);
    });
    res.json({
      code: 200,
      message: `Successfully deleted all homepage objects`,
      success: true,
    });
  }),
);

// Create a new resource
router.post(
  '/resources',
  errorWrap(async (req, res) => {
    if (req.body.image && req.body.image.length > 0) {
      const link = await imageHelper(req.body.image);
      if (link) {
        req.body.image = link;
      }
    }

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
    if (req.body.image && req.body.image.length > 0) {
      const link = await imageHelper(req.body.image);
      if (link) {
        req.body.image = link;
        console.log(req.body);
      }
    }

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

// Delete a category
router.delete(
  '/categories/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({
      code: 200,
      message: `Successfully deleted category ${id}`,
      success: true,
      result: null,
    });
  }),
);

module.exports = router;
