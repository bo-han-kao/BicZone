var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var deviceRouter = require('./routes/device');
var groupRouter = require('./routes/group');
var sceneRouter = require('./routes/scene');
var scheduleRouter = require('./routes/schedule');
var scanRouter=require('./routes/scan');
var upload=require('./routes/upload');

// 測試頁面
var indexNEWRouter = require('./routes/Test');
var crudROuter = require('./routes/CRUDtest');
const { group } = require('console');
const { url } = require('inspector');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/v1/device', deviceRouter);
app.use('/v1/group', groupRouter);
app.use('/v1/scene', sceneRouter);
app.use('/v1/schedule', scheduleRouter);
app.use('/mesh/scan', scanRouter);
app.use('/v1/upload',upload);
// 測試頁面
app.use('/Test', indexNEWRouter);
app.use('/crudtest', crudROuter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// 監聽port8000有沒有啟動
app.listen(8000, function () {
  console.log('伺服器開啟!!')
})

module.exports = app;
