const express = require('express')
const router = express.Router()
const { trips: ctrl } = require('../controllers')

router.get('/', ctrl.index)
router.get('/users', ctrl.individualsTrips)
router.post('/', ctrl.create)
router.delete('/:id', ctrl.deleteTrip)

module.exports = router
