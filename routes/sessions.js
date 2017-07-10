const express = require('express')
const router = express.Router()
const { sessions: ctrl } = require('../controllers')
const { isLoggedIn } = require('../lib/auth')

router.get('/refresh', ctrl.refresh) // new
router.post('/', ctrl.create)

router.delete('/', isLoggedIn, ctrl.destroy)

// Example open and closed routes
router.get('/open', (req, res) => { res.json({ kind: '🔓' }) })
router.get('/closed', isLoggedIn, (req, res) => { res.json({ kind: '🔐' }) })

module.exports = router
