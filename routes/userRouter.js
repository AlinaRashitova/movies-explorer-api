const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { userValidator } = require('../validators/userValidator');

router.get('/me', UserController.getUser);
router.patch('/me', userValidator, UserController.updateUserInfo);

module.exports = router;
