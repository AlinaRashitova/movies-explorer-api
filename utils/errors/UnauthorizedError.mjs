import { UNAUTHORIZED_ERR_CODE } from '../constants';

export default class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERR_CODE;
    this.name = 'UnauthorizedError';
  }
}
