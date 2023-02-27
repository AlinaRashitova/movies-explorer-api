const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const { authSigninValidator, authSignupValidator } = require('../validators/authValidator');

router.post('/signin', authSigninValidator, AuthController.login);

router.post('/signup', authSignupValidator, AuthController.createUser);

module.exports = router;
