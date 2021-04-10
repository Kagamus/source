var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var homeRouter = require('./routes/home')
var searchAPIRouter = require('./routes/search');
var loginRouter = require('./routes/login');
var signUpRouter = require('./routes/signUp');
var navigationRouter = require('./routes/navigationHandler');
var createnewlistRouter = require('./routes/createnewList');
var myListsRouter = require("./routes/myLists");
var animeInfoRouter = require('./routes/animeInfo');
var deleteList = require('./routes/deleteList');
var updateList = require('./routes/updateList');
var findanimeList = require('./routes/findanimeList');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/home', homeRouter);
app.use('/search', searchAPIRouter);
app.use('/signup', signUpRouter);
app.use('/createnewList',createnewlistRouter);
app.use('/mylists', myListsRouter);
// app.use('/testAPI', testAPIRouter);
// app.use('/login', loginRouter);
app.use('/animeInfo', animeInfoRouter);
app.use('/deleteList', deleteList);
app.use('/updateList',updateList);
app.use('/findanimeList',findanimeList);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(res));
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
