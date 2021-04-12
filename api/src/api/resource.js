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
      location,
    } = req.query;
    let query = {};
    if (category != null && category !== '' && category !== 'All Resources') {
      query = { category: category };
      if (subcategory != null && subcategory !== '') {
        query = { ...query, subcategory: subcategory };
      }
    }
    if (cost != null) {
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
    if (language != null && language !== 'All') {
      query = { ...query, availableLanguages: language };
    }
    if (city != null && city !== 'All' && city !== 'All / Champaign County') {
      const ignoreCase = new RegExp('^' + city, 'i');
      query = { ...query, city: ignoreCase };
    }

    let orderBy = null;
    if (sort != null) {
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

    const [long, lat] = await extractLongLat(location);
    let aggregation = [];
    if (long == null || lat == null) {
      if (orderBy === null) {
        aggregation = [
          {
            $facet: {
              totalData: [addFields, { $match: query }],
            },
          },
        ];
      } else if (page == null || size == null) {
        aggregation = [
          {
            $facet: {
              totalData: [addFields, { $match: query }, { $sort: orderBy }],
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
                { $limit: size },
                { $skip: size * (page - 1) },
              ],
              totalCount: [{ $count: 'number of resources' }],
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
      resources[0] = { totalData: resourcesList };
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
