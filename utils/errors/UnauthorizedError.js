const { UNAUTHORIZED_ERR_CODE } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERR_CODE;
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
