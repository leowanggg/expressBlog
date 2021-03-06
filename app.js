var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// import the mongoose module
var mongoose = require("mongoose");
// import express-session module
var session = require('express-session');

// router
var index = require('./routes/index');
var article = require('./routes/article');
var about = require('./routes/about');
var message = require('./routes/message');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// start mongoDB and connect it with mongoose
// set up default mongoose connnection
var mongoDB = 'mongodb://127.0.0.1:27017/blogData';
mongoose.connect(mongoDB);

// get the default connnection
var db = mongoose.connnection;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/fonts', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'goodgood',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7200 * 1000
    }
}));
// router address
app.use('/', index);
app.use('/article', article);
app.use('/about', about);
app.use('/message', message);

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
