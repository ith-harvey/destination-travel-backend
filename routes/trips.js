const express = require('express')
const router = express.Router()
const { trips: ctrl } = require('../controllers')

router.get('/', ctrl.index)
router.get('/users/:id', ctrl.individualsTrips)

module.exports = router
