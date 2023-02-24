const { USER_NOT_FOUND, USER_EXISTS } = require('../utils/constants');
const { NotFoundError, BadRequestError, ConflictError } = require('../utils/errors/index');
const UserModel = require('../models/userModel');

async function getUser(req, res, next) {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user === null) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
}

async function updateUserInfo(req, res, next) {
  try {
    const { name, email } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );
    if (user === null) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'MongooseError') {
      next(new BadRequestError(err.message));
    } else if (err.code === 11000) {
      next(new ConflictError(USER_EXISTS));
    } else {
      next(err);
    }
  }
}

module.exports = {
  getUser,
  updateUserInfo,
};
