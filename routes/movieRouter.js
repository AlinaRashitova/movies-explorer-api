const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const MovieController = require('../controllers/MovieController');

router.get('', MovieController.getMovies);

router.post('', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    trailerLink: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    thumbnail: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    movieId: Joi.number().required(),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
}), MovieController.createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), MovieController.deleteMovie);

module.exports = router;
