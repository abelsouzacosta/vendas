import { Router } from 'express';
import productRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/passwords.routes';
import customerRouter from '@modules/customers/routes/customer.routes';

const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/session', sessionsRouter);
router.use('/password', passwordRouter);
router.use('/customers', customerRouter);

router.get('/', (request, response) => {
  return response.status(200).send({
    message: 'Olá mundo',
  });
});

export default router;
