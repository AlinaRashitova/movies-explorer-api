const { InternalServerError } = require('../utils/errors/index');

module.exports = (err, req, res, next) => {
  const status = err.code || 500;
  const message = err.message || InternalServerError;

  res.status(status).send({ message });
  next();
};
