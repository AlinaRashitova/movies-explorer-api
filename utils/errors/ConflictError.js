const { CONFLICT_ERR_CODE } = require('../constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERR_CODE;
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;
