require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const methodOverride= require('method-override');
const session = require('express-session');

const cookieCheck = require('./middlewares/cookieCheck');
const localsUserCheck = require('./middlewares/localsUserCheck');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');

//API routes
var apiIndexRouter = require('./API/routes/indexRoutes');
var apiProductsRouter = require('./API/routes/productsRoutes');
var apiUsersRouter = require('./API/routes/usersRoutes')
var apiCategoriesRouter = require('./API/routes/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views',));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(methodOverride('_method'));
app.use(session({
    secret : 'dalfLOVE',
    resave : false,
    saveUninitialized : true
}));
app.use(cors());

app.use(cookieCheck);
app.use(localsUserCheck);

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

//APi
app.use('/api', apiIndexRouter)
app.use('/api/products', apiProductsRouter)
app.use('/api/users', apiUsersRouter)
app.use('/api/categories', apiCategoriesRouter)

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