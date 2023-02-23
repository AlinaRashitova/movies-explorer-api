import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/me', UserController.getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), UserController.updateUserInfo);

export default router;
