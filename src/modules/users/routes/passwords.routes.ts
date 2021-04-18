import { Router } from 'express';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { Joi, celebrate, Segments } from 'celebrate';

const passwordRouter = Router();
const controller = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  controller.forgot,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      password_confirm: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  controller.reset,
);

export default passwordRouter;
