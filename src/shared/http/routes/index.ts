import { Router } from 'express';
import productRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/users.routes';

const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);

router.get('/', (request, response) => {
  return response.status(200).send({
    message: 'Olá mundo',
  });
});

export default router;
