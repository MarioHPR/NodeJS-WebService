var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usuarioRouter   = require('./routes/usuario');
var indexRouter     = require('./routes/index');

// novas rotas
var consultasRouter   = require('./routes/consulta');
var instituicaoRouter = require('./routes/instituicao');
var localRouter       = require('./routes/local');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuario', usuarioRouter);
app.use('/', indexRouter);

// novas rotas
app.use('/consulta', consultasRouter);
app.use('/instituicao', instituicaoRouter);
app.use('/local', localRouter);

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
