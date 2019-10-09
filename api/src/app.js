const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');
const routes = require('./routes');

const { errorHandler } = require('./middleware');

const app = express();

app.use(helmet());
app.use(cors());

// Set up logging
const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, 'ymca-api.log'),
  {
    flags: 'a',
  },
);
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
