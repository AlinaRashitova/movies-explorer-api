import { InternalServerError } from '../utils/errors/index';

export default function errorHandler(err, req, res, next) {
  const status = err.code || 500;
  const message = err.message || InternalServerError;

  res.status(status).send({ message });
  next();
}
