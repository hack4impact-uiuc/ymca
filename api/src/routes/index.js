const express = require('express');

const router = express.Router();
const { resource } = require('../api');

router.get('/', (req, res) => {
  res.send('hi');
});

router.use('/api/resources', resource);

module.exports = router;
