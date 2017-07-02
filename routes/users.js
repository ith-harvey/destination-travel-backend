const express = require('express');
const router = express.Router();
const passport = require('passport')

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('/users');
});


// router.get('/auth/facebook/callback', function(req, res, next) {
//   passport.authenticate('facebook', {failureRedirect: '/login' }),
//   function(req, res) {
//     console.log('hit callback');
//     res.redirect('/users');
//   }
// })

router.get('/auth/facebook/callback', function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
      return LogUserIn(req, res, next, err, user, info);
  })(req, res, next);
  res.send('yuuuup')
})




router.get('/login', function(req, res, next) {
  console.log('auth error');
  res.send('respond with error! hitting /login');
});

 // sends user to facebook
router.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email', 'user_friends']}));


function LogUserIn(req, res, next, err, user, info) {
  console.log('///////LogUserIn///////');
  // console.log( 'req ----> ', req);
  console.log( 'user ----> ', user);
  console.log( 'info ----> ', info);
  console.log( 'next ----> ', next);



}




module.exports = router;
