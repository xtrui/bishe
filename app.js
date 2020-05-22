let createError = require('http-errors');
let webpackConfig = require('./vue/webpack.config.js');
let random = require('string-random');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let history = require('connect-history-api-fallback');
let adminRouter = require('./routes/admin')
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let articleRouter = require("./routes/article");
let fileRouter = require("./routes/file");
let session = require('express-session');
const middleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const compiler = webpack(webpackConfig);
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//设置静态资源路径
app.use(express.static('public'));
app.use(express.static('vue/src/assets'));
app.use(express.static('vue/src/public'));
// app.use(express.static(''));
// app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

// 使用 cookieParser 中间件;
app.use(cookieParser());
//使用session
let secret = random(128);
app.use(session({
    secret: secret,
    cookie: {maxAge: 60 * 1000 * 300} //过期时间 ms
}))

//后端路由
app.use('/api/admin', adminRouter);
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/article', articleRouter);
app.use("/api/file", fileRouter);

//vue路由
app.use(history({
    htmlAcceptHeaders: ['text/html'],
    index: '/',
    verbose: true
}));

//middleware
app.use(middleware(compiler, {}));


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

module.exports = app;
