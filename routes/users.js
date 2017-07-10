const express = require('express')
const router = express.Router()
const { users: ctrl } = require('../controllers')
const { isLoggedIn, isAuthorized } = require('../lib/auth')


//ctrl.index sends users to controller folder
router.get('/', ctrl.index)
router.get('/:id', isLoggedIn, isAuthorized, ctrl.show)
router.post('/', ctrl.create)



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('at home!');
// });

//
// router.get('/auth/facebook/callback', function(req, res, next) {
//   passport.authenticate('facebook', function(err, user, info) {
//       return LogUserIn(req, res, next, err, user, info);
//   })(req, res, next);
// })
//
//
// router.get('/login', function(req, res, next) {
//   console.log('auth error');
//   res.send('respond with error! hitting /login');
// });
//
//  // sends user to facebook
// router.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email']}));


// function LogUserIn(req, res, next, err, user, info) {
//   console.log('///////LogUserIn///////');
//   // console.log( 'req ----> ', req);
//   console.log( 'user ----> ', user);
//   console.log( 'info ----> ', info);
//   console.log( 'next ----> ', next);
//   console.log(req.user);
//   res.send('yuuuup')
// }




module.exports = router;
