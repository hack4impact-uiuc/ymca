const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Category = require('../models/category');
const Resource = require('../models/resource');
const { Parser } = require('json2csv');

// Get all categories
router.get(
  '/',
  errorWrap(async (req, res) => {
    const categories = await Category.find();
    res.json({
      code: 200,
      message: '',
      success: true,
      result: categories,
    });
  }),
);

// Download all resources
router.get(
  '/download',
  errorWrap(async (req, res) => {
    let resource = await Resource.find({});

    const transformToReadable = (data) => {
      // Transforms data to readable csv format
      let res = JSON.parse(JSON.stringify(data._doc));

      // Remove ids from fields
      if (res.phoneNumbers)
        res.phoneNumbers.forEach((phone) => delete phone._id);
      if (res.financialAidDetails) delete res.financialAidDetails._id;
      if (res.hoursOfOperation) {
        delete res.hoursOfOperation._id;
        if (res.hoursOfOperation.hoursOfOperation.length == 0)
          delete res.hoursOfOperation;
        else if (res.hoursOfOperation.hoursOfOperation)
          res.hoursOfOperation.hoursOfOperation.forEach((hoo) => {
            delete hoo._id;
          });
      }

      // Remove brackets from Arrays and empty Objects
      Object.entries(res).forEach(([key, value]) => {
        if (Array.isArray(value))
          res[key] = value.toString();
        else if (typeof value === 'object' && Object.keys(value).length === 0)
          res[key] = '';
      });

      return res;
    };

    const opts = {
      transforms: [transformToReadable],
      fields: [
        'category',
        'subcategory',
        'requiredDocuments',
        'name',
        'description',
        'website',
        'email',
        'phoneNumbers',
        'contacts',
        'address',
        'city',
        'eligibilityRequirements',
        'financialAidDetails',
        'cost',
        'internalNotes',
        'hoursOfOperation',
        'lastUpdated',
        'addressLine2',
        'aptUnitSuite',
        'image',
        'state',
        'zip',
      ],
    };

    const json2csv = new Parser(opts);
    const csv = json2csv.parse(resource);
    res.type('text/csv').attachment('all_resources.csv').send(csv);
  }),
);

module.exports = router;
