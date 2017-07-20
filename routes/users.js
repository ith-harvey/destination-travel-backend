const express = require('express')
const router = express.Router()
const { users: ctrl } = require('../controllers')
const { isLoggedIn, isAuthorized } = require('../lib/auth')


//ctrl.index sends users to controller folder
router.get('/', ctrl.index)
router.get('/:id', isLoggedIn, isAuthorized, ctrl.show)
router.post('/signup', ctrl.create)





module.exports = router;
