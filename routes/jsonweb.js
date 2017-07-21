const express = require('express')
const router = express.Router()
const { jsonweb: ctrl } = require('../controllers')

router.post('/login', ctrl.create)
router.post('/fblogin', ctrl.fbCreate)

module.exports = router
