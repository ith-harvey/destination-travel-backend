const express = require('express')
const router = express.Router()
const { trips: ctrl } = require('../controllers')

router.get('/', ctrl.index) // new

module.exports = router
