import { BAD_REQUEST_ERR_CODE } from '../constants';

export default class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERR_CODE;
    this.name = 'BadRequestError';
  }
}
