const express = require('express');

const router = express.Router();
const {
  admin,
  category,
  resource,
  homepage,
  translation,
  volunteer,
} = require('../api');
const { authAdmin, authVolunteer } = require('../middleware/auth');

router.use('/api/categories', category);
router.use('/api/resources', resource);
router.use('/api/admin', authAdmin, admin);
router.use('/api/homepage', homepage);
router.use('/api/translation', translation);
router.use('/api/volunteer', authVolunteer, volunteer);

module.exports = router;
