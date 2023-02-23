import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors as celebrateErrorHandler } from 'celebrate';

import limiter from './middlewares/limiterMiddleware';
import errorHandler from './middlewares/errorMiddleware';
import reqLogger from './middlewares/reqLogMiddleware';
import errLogger from './middlewares/errLogMiddleware';

import router from './routes/index';

dotenv.config();

const app = express();

const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://movie.alinarashitova.nomoredomains.work',
  'http://movie.alinarashitova.nomoredomains.work',
  'http://localhost:3000',
];

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/moviedb', {
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
app.use(celebrateErrorHandler());
app.use(errorHandler);
app.listen(PORT);
