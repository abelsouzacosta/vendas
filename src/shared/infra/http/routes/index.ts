import { Router } from 'express';
import productRouter from '@modules/products/infra/http/routes/products.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/passwords.routes';
import customerRouter from '@modules/customers/infra/http/routes/customer.routes';
import orderRouter from '@modules/orders/infra/http/routes/orders.routes';

const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/session', sessionsRouter);
router.use('/password', passwordRouter);
router.use('/customers', customerRouter);
router.use('/orders', orderRouter);

router.get('/', (request, response) => {
  return response.status(200).send({
    message: 'Olá mundo',
  });
});

export default router;
