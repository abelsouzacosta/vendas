import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';
import { Joi, celebrate, Segments } from 'celebrate';

const customerRouter = Router();
const controller = new CustomerController();

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

export default customerRouter;
