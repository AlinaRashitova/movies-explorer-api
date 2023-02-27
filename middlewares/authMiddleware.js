const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { UnauthorizedError } = require('../utils/errors/index');
const { AUTH_REQUIRED, TOKEN_WRONG_TYPE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError(AUTH_REQUIRED);
  }
  if (!authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(TOKEN_WRONG_TYPE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, config.JWT_KEY);
  } catch (err) {
    next(new UnauthorizedError(TOKEN_WRONG_TYPE));
  }
  req.user = payload;
  next();
};
