const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Category = require('../models/category');
const Resource = require('../models/resource');
const HomePage = require('../models/homepage');
const Translation = require('../models/translation');

const languageTypes = {
  es: 'Spanish',
  fr: 'French',
  zh: 'Chinese',
};
const apiKey = '';

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

// translate text for each language type and store in db
async function translateAndSaveText(description, id) {
  languageTypes.forEach(async function (value, key) {
    var translationKey = '';
    var translationValue = '';
    var source =
      `https://www.googleapis.com/language/translate/v2?key=${apiKey}&source=en&target=${key}&callback=translateText&q=` +
      description;

    source = encodeURI(source);
    const res = await fetch(source, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJSON = await res.json();
    translationKey = `resource-description-${id}`;
    translationValue = responseJSON.data.translations[0].translatedText;
    const updatedTranslation = await Translation.findOne({
      language: { $eq: value },
    });
    updatedTranslation.messages.set(translationKey, translationValue);
    await updatedTranslation.save();
  });
}

// create image
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
    if (req.body.image && req.body.image.length > 0) {
      const link = await imageHelper(req.body.image);
      if (link) {
        req.body.image = link;
      }
    }
    const newResource = new Resource(req.body);
    await newResource.save();
    // translate resource description and save in mongodb
    translateAndSaveText(req.body.description, newResource.id);
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
    // translate resource description and save in mongodb
    translateAndSaveText(req.body.description, id);
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
      { $push: { subcategories: req.body.name } },
      {
        new: true,
        runValidators: true,
      },
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

    const updatedCategory = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        subcategories: req.body.currentName,
      },
      {
        $set: { 'subcategories.$': req.body.newName },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    await Resource.updateMany(
      { category: req.body.category, subcategory: req.body.currentName },
      { $set: { 'subcategory.$': req.body.newName } },
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
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $pull: { subcategories: req.body.subcategory },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    await Resource.updateMany(
      { category: req.body.category, subcategory: req.body.subcategory },
      { $pull: { subcategory: req.body.subcategory } },
    );

    res.json({
      code: 200,
      message: `Successfully deleted category ${id}`,
      success: true,
      result: updatedCategory,
    });
  }),
);

// Create a translation object
router.post(
  '/translation',
  errorWrap(async (req, res) => {
    const newTranslation = new Translation(req.body);
    await newTranslation.save();
    res.json({
      code: 201,
      message: `Succesfully created new Translation object`,
      success: true,
      result: newTranslation,
    });
  }),
);

// Add a translation message
router.put(
  '/translation',
  errorWrap(async (req, res) => {
    const { language, key, message } = req.body;
    const updatedTranslation = await Translation.findOne({
      language: { $eq: language },
    });
    updatedTranslation.messages.set(key, message);
    await updatedTranslation.save();
    res.json({
      code: 200,
      message: `Successfully added ${language} translation for ${key}`,
      success: true,
      result: updatedTranslation,
    });
  }),
);

module.exports = router;
