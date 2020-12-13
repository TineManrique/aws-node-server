var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const mongoDbUri = config.mongoDbUri;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogPostRouter = require('./routes/blogPost');
var devDetailRouter = require('./routes/developerDetail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// MongoDB Connection
mongoose
  .connect(mongoDbUri, { useNewUrlParser: true })
  .then(() => {
      console.log('MongoDB Connected');
  }).catch(err => {
      console.log(`Error connecting to MongoDB. ${err}`);
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogPosts', blogPostRouter);
app.use('/devDetails', devDetailRouter);

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
