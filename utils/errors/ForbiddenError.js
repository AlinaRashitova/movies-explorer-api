const { FORBIDDEN_ERR_CODE } = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERR_CODE;
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
