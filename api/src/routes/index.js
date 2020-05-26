const express = require('express');

const router = express.Router();
const { admin, category, resource, homepage } = require('../api');
const { authAdmin, authGeneral } = require('../middleware/auth');

router.use('/api/categories', category);
router.use('/api/resources', resource);
router.use('/api/admin', authAdmin, admin);
router.use('/api/homepage', homepage);

module.exports = router;
