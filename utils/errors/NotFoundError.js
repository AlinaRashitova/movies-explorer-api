const { NOT_FOUND_ERR_CODE } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERR_CODE;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
