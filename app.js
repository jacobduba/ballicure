var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var multer = require('multer');
var logger = require('morgan');
var db = require('./utils/db');

var app = express();

var indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000, secure: false },
}));

if (app.get('env') === 'production') {
    sess.cookie.secure = true;
}

if (app.get('env') === 'production') {
    db.defaults({
        pins: {},
        cured: {}
    })
} else {
    db.defaults({
        pins: {
            '123456': {
                id: crypto.randomBytes(64).toString('hex'),
                signature: null,
                verification: null
            }
        },
        cured: {

        }
    }).write();
}

// no session? go to start
app.use(function(req, res, next) {
    if (!(req.originalUrl === '/' || req.originalUrl === '/step/success') && req.session.active === undefined) {
        res.redirect('/');
    } else {
        next();
    }

});

// routes
app.use('/', indexRouter);

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

global.__basedir = __dirname;
module.exports = app;
