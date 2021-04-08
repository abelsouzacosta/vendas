import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { Joi, celebrate, Segments } from 'celebrate';

const sessionsRouter = Router();
const controller = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  controller.index,
);

export default sessionsRouter;
