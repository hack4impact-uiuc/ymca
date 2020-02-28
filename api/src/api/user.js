const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { errorWrap } = require('../middleware');
const User = require('../../../auth/src/models/User');
const Resource = require('../models/resource');
const jwt_decode = require('jwt-decode');

router.get(
  '/resources',
  errorWrap(async (req, res) => {
    const userId = jwt_decode(req.headers.token)['userId'];
    const user = await User.findById(userId);
    res.status(200).json({
      code: 200,
      message: `Succesfully got saved resources`,
      success: true,
      result: user.savedResources,
    });
  }),
);

// Deleted resource to saved resources of user
router.put(
  '/deleteresource',
  errorWrap(async (req, res) => {
    const { resourceId } = req.params;
    const userId = jwt_decode(req.headers.token)['userId'];
    const user = await User.findById(userId);
    var index = user.savedResources.indexOf(resourceId);
    if (index !== -1) {
      user.savedResources.splice(index, 1);
    }
    user.save();
    res.status(200).json({
      code: 200,
      message: `Successfully deleted saved resource`,
      success: true,
      result: resourceId,
    });
  }),
);

router.put(
  '/addresource',
  errorWrap(async (req, res) => {
    const { resourceId } = req.params;
    const userId = jwt_decode(req.headers.token)['userId'];
    const user = await User.findById(userId);
    user.savedResources.push(resourceId);
    user.save();
    res.status(200).json({
      code: 200,
      message: `Successfully added saved resource`,
      success: true,
      result: resourceId,
    });
  }),
);

module.exports = router;
