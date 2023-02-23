import { Router } from 'express';
import auth from '../middlewares/authMiddleware';
import NotFoundError from '../utils/errors/NotFoundError';
import { PAGE_NOT_FOUND } from '../utils/constants';
import authRouter from './authRouter';
import movieRouter from './movieRouter';
import userRouter from './userRouter';

const router = Router();

router.use('', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

export default router;
