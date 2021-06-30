const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Category = require('../models/category');
const Resource = require('../models/resource');
const HomePage = require('../models/homepage');
const {
  deleteString,
  deleteTranslatedResourceText,
  translateAndSaveResourceText,
  translateCategoryString,
  translateSubcategoryString,
  translateTestimonialString,
} = require('../utils/translate');
const extractLongLat = require('../utils/extractLongLat');

const imageHelper = async (image) => {
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

// Create image
router.post(
  '/imageUpload',
  errorWrap(async (req, res) => {
    const link = await imageHelper(req.body.image);
    if (link) {
      res.json({
        code: 200,
        message: 'Succesfully uploaded image to imgur',
        success: true,
        result: link,
      });
    }
  }),
);

// Create a homepage object
router.post(
  '/homepage',
  errorWrap(async (req, res) => {
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
    const homePageObject = await HomePage.findOne();
    homePageObject.backgroundImage = req.body.backgroundImage;
    homePageObject.testimonials = req.body.testimonials;
    homePageObject.partners = req.body.partners;
    await homePageObject.save();

    homePageObject.testimonials.forEach(async (testimonial) => {
      await translateTestimonialString(
        testimonial.title,
        `testimonial-title-${testimonial._id}`,
        testimonial._id,
      );
      await translateTestimonialString(
        testimonial.testimonial,
        `testimonial-${testimonial._id}`,
        testimonial._id,
      );
    });

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
    await HomePage.deleteMany({}, function (err) {
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
    const { image, address, city, state, zip } = req.body;

    if (image && image.length > 0) {
      const link = await imageHelper(image);
      if (link) {
        req.body.image = link;
      }
    }

    if (
      (address && address.length > 0) ||
      (city && city.length > 0) ||
      (state && state.length > 0) ||
      (zip && zip.length > 0)
    ) {
      const [long, lat] = await extractLongLat(
        `${address},${city},${state},${zip}`,
      );
      if (
        long !== null &&
        long !== undefined &&
        lat !== null &&
        lat !== undefined
      ) {
        req.body.geoLocation = { type: 'Point', coordinates: [long, lat] };
      }
    }

    const newResource = new Resource(req.body);
    await newResource.save();

    // translate resource fields and save in mongodb
    const {
      description,
      phoneNumbers,
      financialAidDetails,
      eligibilityRequirements,
      requiredDocuments,
    } = newResource;
    await translateAndSaveResourceText(
      description,
      phoneNumbers,
      financialAidDetails,
      eligibilityRequirements,
      requiredDocuments,
      newResource.id,
    );

    res.status(201).json({
      code: 201,
      message: `Successfully created new resource ${newResource.id}`,
      success: true,
      result: newResource,
    });
  }),
);

// Edit categories of a resource
router.patch(
  '/resources/:id',
  errorWrap(async (req, res) => {
    if (req.body.category && req.body.subcategory) {
      const { id } = req.params;
      const updatedResource = await Resource.findByIdAndUpdate(
        id,
        {
          $set: {
            category: req.body.category,
            subcategory: req.body.subcategory,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );
      res.json({
        code: 200,
        message: `Successfully updated resource ${id}`,
        success: true,
        result: updatedResource,
      });
    }
  }),
);

// Edit an existing resource
router.put(
  '/resources/:id',
  errorWrap(async (req, res) => {
    const { image, address, city, state, zip } = req.body;

    if (image && image.length > 0) {
      const link = await imageHelper(image);
      if (link) {
        req.body.image = link;
      }
    }

    if (
      (address && address.length > 0) ||
      (city && city.length > 0) ||
      (state && state.length > 0) ||
      (zip && zip.length > 0)
    ) {
      const [long, lat] = await extractLongLat(
        `${address},${city},${state},${zip}`,
      );
      if (
        long !== null &&
        long !== undefined &&
        lat !== null &&
        lat !== undefined
      ) {
        req.body.geoLocation = { type: 'Point', coordinates: [long, lat] };
      }
    }

    const { id } = req.params;
    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // translate resource text and save in mongodb
    const {
      description,
      phoneNumbers,
      financialAidDetails,
      eligibilityRequirements,
      requiredDocuments,
    } = updatedResource;
    await translateAndSaveResourceText(
      description,
      phoneNumbers,
      financialAidDetails,
      eligibilityRequirements,
      requiredDocuments,
      id,
    );

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
    const {
      description,
      phoneNumbers,
      financialAidDetails,
      eligibilityRequirements,
      requiredDocuments,
    } = await Resource.findByIdAndDelete(id);
    await deleteTranslatedResourceText(
      description,
      phoneNumbers,
      financialAidDetails,
      eligibilityRequirements,
      requiredDocuments,
      id,
    );

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

    await translateCategoryString(
      description,
      `category-${newCategory._id}`,
      newCategory._id,
    );

    res.status(201).json({
      code: 201,
      message: `Successfully created new category ${newCategory.id}`,
      success: true,
      result: newCategory,
    });
  }),
);

// Rename an existing category
router.put(
  '/categories/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: { name: req.body.newName } },
      {
        new: true,
        runValidators: true,
      },
    );

    await Resource.updateMany(
      { category: req.body.currentName },
      { $set: { 'category.$': req.body.newName } },
    );

    await translateCategoryString(description, `category-${id}`, id);

    res.json({
      code: 200,
      message: `Successfully updated category ${id}`,
      success: true,
      result: updatedCategory,
    });
  }),
);

// Delete a category
router.delete(
  '/categories/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);

    await Resource.updateMany(
      { category: req.body.categoryName },
      { $pull: { category: req.body.categoryName } },
    );

    await deleteString(`category-${id}`);

    res.json({
      code: 200,
      message: `Successfully deleted category ${id}`,
      success: true,
      result: null,
    });
  }),
);

// Create a new subcategory
router.post(
  '/subcategories/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $push: { subcategories: { name: req.body.name } } },
      {
        new: true,
        runValidators: true,
      },
    );

    await translateSubcategoryString(
      description,
      `subcategory-${updatedCategory._id}`,
      updatedCategory._id, // unsure if this is real
    );

    res.status(201).json({
      code: 201,
      message: `Successfully created new subcategory ${req.body.name}`,
      success: true,
      result: updatedCategory,
    });
  }),
);

// Rename an existing subcategory
router.put(
  '/subcategories/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const { category, currentName, newName, subcategoryId } = req.body;

    const updatedCategory = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        subcategories: { $elemMatch: { _id: subcategoryId } },
      },
      {
        $set: {
          'subcategories.$': {
            _id: subcategoryId,
            name: newName,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    await Resource.updateMany(
      { category: category, subcategory: currentName },
      { $set: { 'subcategory.$': newName } },
    );

    await translateSubcategoryString(
      description,
      `subcategory-${subcategoryId}`,
      subcategoryId,
    );

    res.json({
      code: 200,
      message: `Successfully updated subcategory ${req.body.newName}`,
      success: true,
      result: updatedCategory,
    });
  }),
);

// Delete a subcategory
router.delete(
  '/subcategories/:id',
  errorWrap(async (req, res) => {
    const { id } = req.params;
    const { category, subcategory, subcategoryId } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $pull: {
          subcategories: { _id: subcategoryId },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    // Removes subcategory, set one matching category to null
    // Then, remove that null. Workaround to remove only one matching category
    await Resource.updateMany(
      { category: category, subcategory: subcategory },
      {
        $pull: { subcategory: subcategory },
        $unset: { 'category.$': true },
      },
    );
    await Resource.updateMany({}, { $pull: { category: null } });

    await deleteString(`subcategory-${subcategoryId}`);

    res.json({
      code: 200,
      message: `Successfully deleted subcategory ${subcategoryId}`,
      success: true,
      result: updatedCategory,
    });
  }),
);

module.exports = router;
