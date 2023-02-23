import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestError, ConflictError, UnauthorizedError } from '../utils/errors/index';
import UserModel from '../models/userModel';
import { SAULT_NUMBER, USER_EXISTS, AUTH_ERROR } from '../utils/constants';

const { JWT_SECRET = 'secret-key' } = process.env;

async function createUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, SAULT_NUMBER);
    const user = await UserModel.create({
      name: req.body.name,
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
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
}

export default { createUser, login };
