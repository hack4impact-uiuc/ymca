const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Resource = require('../models/resource');
const extractLongLat = require('../utils/extractLongLat');

const addFields = {
  $addFields: {
    costSortId: {
      $cond: [
        { $eq: ['$cost', 'Free'] },
        0,
        {
          $cond: [
            { $eq: ['$cost', { $literal: '$' }] },
            1,
            {
              $cond: [
                { $eq: ['$cost', { $literal: '$$' }] },
                2,
                {
                  $cond: [{ $eq: ['$cost', { $literal: '$$$' }] }, 3, 4],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

const getGeoNear = (long, lat) => {
  return {
    $geoNear: {
      near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(long), parseFloat(lat)],
        },
      },
      distanceField: 'calculatedDistance',
      spherical: true,
      distanceMultiplier: 0.000621371,
    },
  };
};

// Get all resources (with query params)
router.get(
  '/',
  errorWrap(async (req, res) => {
    const {
      category,
      subcategory,
      cost,
      language,
      city,
      sort,
      size,
      page,
      long,
      lat,
    } = req.query;

    let query = {};
    if (category && category !== '' && category !== 'All Resources') {
      query = { category: category };
      if (subcategory && subcategory !== '') {
        query = { ...query, subcategory: subcategory };
      }
    }
    if (cost) {
      // get last part, if length is 1 then all resources
      const parts = cost.split(' ');
      if (parts.length > 0) {
        if (parts.length === 1) {
          // Free
          query = { ...query, cost: 'Free' };
        }
        const price = parts[parts.length - 1];
        if (price === '$$') {
          query = {
            ...query,
            $or: [{ cost: price }, { cost: '$' }, { cost: 'Free' }],
          };
        } else if (price === '$') {
          query = { ...query, $or: [{ cost: price }, { cost: 'Free' }] };
        }
        // If $$$, then it's all prices, so no need to query extra
      }
    }
    if (language && language !== 'All') {
      query = { ...query, availableLanguages: language };
    }
    if (city && city !== 'All' && city !== 'All / Champaign County') {
      const ignoreCase = new RegExp('^' + city, 'i');
      query = { ...query, city: ignoreCase };
    }

    let orderBy = null;
    if (sort) {
      if (
        sort === 'Cost' ||
        sort === 'Costo' ||
        sort === 'Coût' ||
        sort === '花费'
      ) {
        orderBy = { costSortId: 1 };
      } else if (
        sort === 'Name' ||
        sort === 'Nombre' ||
        sort === 'Nom' ||
        sort === '名称'
      ) {
        orderBy = { name: 1 };
      }
    }

    let aggregation = [];
    if (!long || !lat) {
      if (!orderBy) {
        aggregation = [
          {
            $facet: {
              totalData: [addFields, { $match: query }],
              totalCount: [{ $match: query }, { $count: 'resourceCount' }],
            },
          },
        ];
      } else if (!page || !size) {
        aggregation = [
          {
            $facet: {
              totalData: [addFields, { $match: query }, { $sort: orderBy }],
              totalCount: [{ $match: query }, { $count: 'resourceCount' }],
            },
          },
        ];
      } else {
        aggregation = [
          {
            $facet: {
              totalData: [
                addFields,
                { $match: query },
                { $sort: orderBy },
                { $skip: parseInt(size) * (parseInt(page) - 1) },
                { $limit: parseInt(size) },
              ],
              totalCount: [{ $match: query }, { $count: 'resourceCount' }],
            },
          },
        ];
      }
    } else {
      aggregation = [getGeoNear(long, lat), addFields, { $match: query }];
    }

    let resources = await Resource.aggregate(aggregation);
    // is this a geo aggregate?
    if (!('totalData' in resources[0])) {
      const resourcesList = resources;
      resources = [];
      resources[0] = {
        totalData: resourcesList,
        totalCount: [resourcesList.length],
      };
    }

    res.json({
      code: 200,
      message: '',
      success: true,
      result: resources[0],
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

    res.json({
      code: 200,
      message: `Successfully found resource ${id}`,
      success: true,
      result: resource,
    });
  }),
);

module.exports = router;
