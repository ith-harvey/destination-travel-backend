const express = require('express')
const router = express.Router()
const { jsonweb: ctrl } = require('../controllers')
const { isLoggedIn } = require('../lib/auth')

router.get('/refresh', ctrl.refresh) // new
router.delete('/', isLoggedIn, ctrl.destroy)
router.post('/login', ctrl.create)
router.post('/fblogin', ctrl.fbCreate)



// Example open and closed routes
// router.get('/open', (req, res) => { res.json({ kind: '🔓' }) })
// router.get('/closed', isLoggedIn, (req, res) => { res.json({ kind: '🔐' }) })

module.exports = router
