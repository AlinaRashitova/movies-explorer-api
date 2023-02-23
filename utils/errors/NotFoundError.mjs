import { NOT_FOUND_ERR_CODE } from '../constants';

export default class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERR_CODE;
    this.name = 'NotFoundError';
  }
}
