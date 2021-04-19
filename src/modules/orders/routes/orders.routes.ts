import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { Joi, celebrate, Segments } from 'celebrate';

const orderRouter = Router();
const controller = new OrdersController();

orderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      products: Joi.required(),
    },
  }),
  controller.create,
);

orderRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  controller.index,
);

export default orderRouter;
