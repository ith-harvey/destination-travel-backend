const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pg = require('pg')
const passport = require('passport')
require('dotenv').config()

const index = require('./routes/index');
const users = require('./routes/users');
const sessions = require('./routes/sessions');

const passportOauth = require('./passport-Oauth.js')
const app = express();
const session = require('express-session');

// Facebook O-Auth
passport.use(passportOauth)

// uncomment after placing your favicon in /public

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  name: 'destination-travel-application',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: false }
}))

app.use(require('cors')({ // new
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: 200
}));



app.use('/', index);
app.use('/users', users);
app.use('/sessions', sessions);





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


module.exports = app;
