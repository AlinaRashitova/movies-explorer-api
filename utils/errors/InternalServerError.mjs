import { INTERNAL_SERVER_ERR_CODE } from '../constants';

export default class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERR_CODE;
    this.name = 'InternalServerError';
  }
}
