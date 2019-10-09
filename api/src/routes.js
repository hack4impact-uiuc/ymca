const express = require('express')
const router = express.Router()
const {
  resource
} = require('./api')

// sets up the routers defined in the module /src/api
router.use('/resource', resource)

module.exports = router