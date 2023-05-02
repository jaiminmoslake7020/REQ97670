var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var staffRouter = require('./routes/staff');
var positionRouter = require('./routes/position');
var positionTypeRouter = require('./routes/positionType');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/position', positionRouter);
app.use('/staff', staffRouter);
app.use('/position-type', positionTypeRouter);

module.exports = app;
