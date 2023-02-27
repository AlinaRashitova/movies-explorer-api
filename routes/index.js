const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const NotFoundError = require('../utils/errors/NotFoundError');
const { PAGE_NOT_FOUND } = require('../utils/constants');
const authRouter = require('./authRouter');
const movieRouter = require('./movieRouter');
const userRouter = require('./userRouter');

router.use('', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

module.exports = router;
