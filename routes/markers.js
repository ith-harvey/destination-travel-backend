const express = require('express')
const router = express.Router()
const { markers: ctrl } = require('../controllers')

router.get('/', ctrl.index)
router.get('/cities/:id', ctrl.cityMarkers)

module.exports = router
