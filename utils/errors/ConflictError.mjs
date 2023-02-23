import { CONFLICT_ERR_CODE } from '../constants';

export default class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERR_CODE;
    this.name = 'ConflictError';
  }
}
