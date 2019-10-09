const express = require('express');

const router = express.Router();
const testAPI = require('./testAPI');

// mydomain.com/
router.get('/', (req, res) => {
  res.send('hi');
});

router.use('/testAPI', testAPI);

module.exports = router;
