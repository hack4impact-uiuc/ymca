const express = require('express');

const router = express.Router();
const { category, resource } = require('../api');

router.use('/api/categories', category);
router.use('/api/resources', resource);

module.exports = router;
