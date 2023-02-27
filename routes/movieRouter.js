const router = require('express').Router();
const MovieController = require('../controllers/MovieController');
const { movieValidator, movieIdValidator } = require('../validators/movieValidator');

router.get('', MovieController.getMovies);

router.post('', movieValidator, MovieController.createMovie);

router.delete('/:_id', movieIdValidator, MovieController.deleteMovie);

module.exports = router;
