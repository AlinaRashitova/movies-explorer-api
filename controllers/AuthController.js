const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { BadRequestError, ConflictError, UnauthorizedError } = require('../utils/errors/index');
const UserModel = require('../models/userModel');
const { SAULT_NUMBER, USER_EXISTS, AUTH_ERROR } = require('../utils/constants');

async function createUser(req, res, next) {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, SAULT_NUMBER);
    const user = await UserModel.create({
      name,
      email,
      password: hash,
    });
    res.send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else if (err.code === 11000) {
      next(new ConflictError(USER_EXISTS));
    } else {
      next(err);
    }
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).select('+password');
    if (user === null || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError(AUTH_ERROR);
    }
    const token = jwt.sign({ _id: user._id }, config.JWT_KEY, { expiresIn: '7d' });
    res.send({
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  login,
};
