var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var fileUpload = require("express-fileupload");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var RouterEmployes = require('./routes/employes');

var app = express();
const keys = require('./settings/keys');

const session = require('express-session');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.set('key', keys.key)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json({limit: '25mb'}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true
}));
app.use(express.urlencoded({ extended: false, limit: '25mb', }));
app.use(cookieParser());

// esta linea es para mostrar las imagenes guardadas en el servidor
app.use("/public",express.static('public'));

// esta linea es para los archivos estaticos en el servidor
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employes/', RouterEmployes);

app.use(fileUpload());
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
