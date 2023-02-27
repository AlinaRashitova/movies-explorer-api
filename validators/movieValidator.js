const { celebrate, Joi } = require('celebrate');

const movieValidator = celebrate({
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
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  movieValidator,
  movieIdValidator,
};
