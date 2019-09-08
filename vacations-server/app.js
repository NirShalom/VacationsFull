var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const vacationsRouter = require('./routes/vacations');
const favoritesRouter = require('./routes/favorites');

var app = express();
app.use(cors());

// const notFoundPage = (path) => {
//     return (req, Res, next) => {
//         res.sendFile(path); // why it isn't working?
//     }
// };

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vacations', vacationsRouter);
app.use('/favorites', favoritesRouter);
//app.use(notFoundPage(path.join(__dirname, 'public', '404.html')))

module.exports = app;
