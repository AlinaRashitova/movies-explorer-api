const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const limiter = require('./middlewares/limiterMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');
const reqLogger = require('./middlewares/reqLogMiddleware');
const errLogger = require('./middlewares/errLogMiddleware');

const router = require('./routes/index');
const config = require('./utils/config');

const app = express();

const allowedCors = [
  'https://movie.alinarashitova.nomoredomains.work',
  'http://movie.alinarashitova.nomoredomains.work',
  'http://localhost:3000',
];

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqLogger);
app.use(helmet());
app.use(limiter);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
  return null;
});

app.use('/', router);
app.use(errLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.PORT);
