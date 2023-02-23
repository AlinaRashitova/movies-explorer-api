import MovieModel from '../models/movieModel';
import { NotFoundError, ForbiddenError, BadRequestError } from '../utils/errors/index';
import { MOVIE_NOT_FOUND, NO_RIGHTS } from '../utils/constants';

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
    const owner = req.body._id;
    const movie = await MovieModel.save(owner).populate(
      'owner',
    );
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
    const movie = await MovieModel.findById(req.params.id).populate(
      'owner',
    );
    if (movie === null) {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    }
    if (movie.owner.id !== req.user._id) {
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

export default { getMovies, createMovie, deleteMovie };
