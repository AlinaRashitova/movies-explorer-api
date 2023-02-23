import { FORBIDDEN_ERR_CODE } from '../constants';

export default class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERR_CODE;
    this.name = 'ForbiddenError';
  }
}
