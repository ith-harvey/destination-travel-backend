const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pg = require('pg')
const passport = require('passport')
require('dotenv').config()

const cors = require('cors')

const index = require('./routes/index');
const users = require('./routes/users');
const sessions = require('./routes/sessions');
const trips = require('./routes/trips');
const cities = require('./routes/cities');
const markers = require('./routes/markers');

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

app.use(allowCrossDomain)

app.use(session({
  name: 'destination-travel-application',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: false }
}))

// app.use(require('cors')({ // new
//   origin: process.env.CLIENT_URL,
//   credentials: true,
//   optionsSuccessStatus: 200
// }));

// CORS Cross Domain
function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
}


app.use('/', index);
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/trips', trips);
app.use('/cities', cities);
app.use('/markers', markers);





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
  console.error(err)
});


module.exports = app;
