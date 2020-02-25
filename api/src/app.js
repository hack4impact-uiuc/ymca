const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.env`),
});

const { errorHandler } = require('./middleware');

const app = express();

app.use(helmet());
app.use(cors());

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.get('/', (req, res) => res.json('API working!'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));
}

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
