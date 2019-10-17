const express = require('express');

const router = express.Router();
const { resource, register, login } = require('../api');

router.get('/', (req, res) => {
  res.send('hi');
});

router.use('/resources', resource);
router.use('/register', register);
router.use('/login', login);

module.exports = router;
