const express = require('express')
const router = express.Router()
const { users: ctrl } = require('../controllers')


//ctrl.index sends users to controller folder
router.get('/', ctrl.index)
router.post('/signup', ctrl.create)





module.exports = router;
