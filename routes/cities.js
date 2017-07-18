const express = require('express')
const router = express.Router()
const { cities: ctrl } = require('../controllers')

router.get('/', ctrl.index)
router.get('/trips/:id', ctrl.tripsCities)
router.delete('/:id', ctrl.deleteCity)

module.exports = router
