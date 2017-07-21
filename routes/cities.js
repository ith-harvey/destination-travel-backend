const express = require('express')
const router = express.Router()
const { cities: ctrl } = require('../controllers')
const { hasJwtToken } = require('../lib/auth')

router.get('/', ctrl.index)
router.get('/trips/:id', ctrl.tripsCities)
router.post('/fbfriends', hasJwtToken, ctrl.fbfriendsCities)

router.delete('/:id', ctrl.deleteCity)
router.post('/trips/:id', ctrl.postCity)

module.exports = router
