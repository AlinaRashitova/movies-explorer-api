const { INTERNAL_SERVER_ERR_CODE } = require('../constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERR_CODE;
    this.name = 'InternalServerError';
  }
}

module.exports = InternalServerError;
