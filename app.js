const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config()

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

function facebookOAuth() {
  console.log('in O auth');
  //Pasport O auth
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/users/auth/facebook/callback"
  },
    function(accessToken, refreshToken, profile, cb) {
      console.log('success!!! access Token --->', accessToken);
      console.log('success!!! refresh Token --->', refreshToken);
      console.log('success!!! Profile --->', profile);

        if (accessToken) {return facebookCallback(null,accessToken)}
        if (refreshToken) {return facebookCallback(null,refreshToken)}

        return facebookCallback(' ERROR : No refresh or access Token exists!')
    }));
}


function facebookCallback(err,token) {
  console.log('error ----->',err);
  console.log('token ---->',token);

}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

facebookOAuth()

module.exports = app;
