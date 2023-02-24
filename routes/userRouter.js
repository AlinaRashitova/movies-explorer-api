const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/me', UserController.getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), UserController.updateUserInfo);

module.exports = router;
