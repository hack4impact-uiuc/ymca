const express = require('express');

const router = express.Router();
const { admin, category, resource } = require('../api');
const auth = require('../middleware/auth');

router.use('/api/categories', category);
router.use('/api/resources', resource);
router.use('/api/admin', auth, admin);

module.exports = router;
