import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';
import { Joi, celebrate, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const customerRouter = Router();
const controller = new CustomerController();

customerRouter.use(isAuthenticated);

customerRouter.get('/', controller.index);

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  controller.create,
);

customerRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),

    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
    },
  }),
  controller.update,
);

customerRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  controller.delete,
);

export default customerRouter;
