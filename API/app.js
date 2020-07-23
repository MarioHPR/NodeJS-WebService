var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');

var usuarioRouter = require('./routes/usuario');
var loginRouter   = require('./routes/login');

var instituicaoRouter     = require('./routes/instituicao');
var localRouter           = require('./routes/localidade');
var exameRouter           = require('./routes/exames');
var consultaRouter        = require('./routes/consultas');
var parametrosRouter      = require('./routes/parametros');
var campoPartrRouter      = require('./routes/campoParametro');
var parametroExameRouter  = require('./routes/parametroExame');

var tipoExameRouter   = require('./routes/tipoExame');

var parametroGeraisRouter = require('./routes/Parametros/parametrosGerais');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuario', usuarioRouter);
app.use('/login', loginRouter);

app.use('/instituicao', instituicaoRouter);
app.use('/localidade', localRouter);
app.use('/exames', exameRouter);
app.use('/consultas', consultaRouter);
app.use('/parametros', parametrosRouter);
app.use('/campoParametro', campoPartrRouter);
app.use('/parametroExame', parametroExameRouter);

app.use('/parametrosGerais', parametroGeraisRouter);


app.use('/tipoExame', tipoExameRouter);

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
