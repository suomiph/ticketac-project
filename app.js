var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

require('./models/connection');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parameters for express-sessions
app.use(session({ 
	secret: 'a4f8071f-c873-4447-8ee2',
	resave: false,
	saveUninitialized: false,
	})
); // parameters for express-sessions


// creates routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/login');

app.use('/', indexRouter);
app.use('/login', usersRouter);


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

// app.locals functions

app.locals.stringDate = function (date, longDay = 2, indYear = 0) {
	
	if ( typeof(date) != "date" ) {
		date = new Date(date);
	}
		
	if (longDay==2){ 
		var day = String( date.getDate() ).padStart(longDay,'0'); 
	} else { 
		var day = String( date.getDate() ); 
	}
	
	var month = String( date.getMonth()+1 ).padStart(2,'0');
 	var year = String( date.getFullYear() ).slice(indYear);
 	
 	return `${day}/${month}/${year}`;
}


module.exports = app;