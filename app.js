var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

var index = require('./routes/index');
var users = require('./routes/users');
// Get the API route ...
var api = require('./routes/api.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// This must be above the routes
//CORS config so that the angular app can talk to this api without errors on permission
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use('/', index);
app.use('/users', users);

//Use the API routes for 
//all routes matching /api
app.use('/api', api);

mongoose.connect('mongodb://127.0.0.1:27017/workoutapp', { useNewUrlParser: true })
  .then(()=> 
    { console.log
      (`Succesfully Connected to the Mongodb Database  at URL :mongodb://127.0.0.1:27017/workoutapp`)
    })
  .catch(()=> 
    { console.log
      (`Error Connecting to the Mongodb Database at URL :mongodb://127.0.0.1:27017/workoutapp`)
    })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
