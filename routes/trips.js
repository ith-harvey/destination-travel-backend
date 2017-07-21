const express = require('express')
const router = express.Router()
const { trips: ctrl } = require('../controllers')
const { hasJwtToken } = require('../lib/auth')

router.get('/', ctrl.index)
router.get('/users', hasJwtToken, ctrl.individualsTrips)
router.post('/', hasJwtToken, ctrl.create)
router.delete('/:id',hasJwtToken, ctrl.deleteTrip)

module.exports = router
