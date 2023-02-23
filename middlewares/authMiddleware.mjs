import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors/index';
import { AUTH_REQUIRED, TOKEN_WRONG_TYPE } from '../utils/constants';

const { JWT_SECRET = 'secret-key' } = process.env;

export default function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedError(AUTH_REQUIRED);
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(TOKEN_WRONG_TYPE);
    }

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError(TOKEN_WRONG_TYPE));
  }
  next();
}
