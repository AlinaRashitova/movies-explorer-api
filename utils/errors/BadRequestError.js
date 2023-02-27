const { BAD_REQUEST_ERR_CODE } = require('../constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERR_CODE;
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;
