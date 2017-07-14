const express = require('express')
const router = express.Router()
const { markers: ctrl } = require('../controllers')

router.get('/', ctrl.index)
router.get('/cities/:id', ctrl.cityMarkers)

// this is where my error was!
router.post('/cities/:id', ctrl.insertCityMarker)

module.exports = router
