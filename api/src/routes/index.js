const express = require('express');

const router = express.Router();
const { resource, register } = require('../api');

router.get('/', (req, res) => {
  res.send('hi');
});

router.use('/resources', resource);
router.use('/register', register);

module.exports = router;
