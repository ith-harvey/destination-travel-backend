const express = require('express')
const router = express.Router()
const knex = require('../db')
const { markers: ctrl } = require('../controllers')

router.get('/', ctrl.index)
router.get('/cities/:id', ctrl.cityMarkers)
router.post('/cities/:id', ctrl.insertCityMarker)
router.delete('/:id', ctrl.deleteMarker)


module.exports = router
