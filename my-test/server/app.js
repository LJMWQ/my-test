var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var cityRouter = require('./routes/citypages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 登录拦截：   收藏、加入购物车等操作，都要先登录才可以    
// 在use里写个function会得到最高优先级    所有use里    先执行这个写function的use

// 登录拦截不好使    router.post不好使

app.use(function (req, res, next) {
  // cookie是在客户端保存的，所以要用req去取cookie
  if (req.cookie.userId) {
    // 这是已登录状态  不用管   直接next()
    next();
  } else {
    // 未登录状态   需要判断用户的操作是啥    将登录\logout操作设为白名单，别的操作设为黑名单，需要先登录才可以操作
    if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' || req.originalUrl == '/citypages') {
      next();
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      })
    }
  }
});

app.use('/', indexRouter);
app.use('/goods', goodsRouter);
app.use('/users', usersRouter);
app.use('/citypages', cityRouter);

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
