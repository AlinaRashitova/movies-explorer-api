const MovieModel = require('../models/movieModel');
const { NotFoundError, ForbiddenError, BadRequestError } = require('../utils/errors/index');
const { MOVIE_NOT_FOUND, NO_RIGHTS } = require('../utils/constants');

async function getMovies(req, res, next) {
  try {
    const movies = await MovieModel.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
}

async function createMovie(req, res, next) {
  try {
    const owner = req.user._id;
    const movie = await MovieModel.create({ ...req.body, owner });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
}

async function deleteMovie(req, res, next) {
  try {
    const movie = await MovieModel.findById(req.params._id);
    if (movie === null) {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    }
    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError(NO_RIGHTS);
    }
    await movie.delete();
    res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
