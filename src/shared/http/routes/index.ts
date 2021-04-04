import { Router } from 'express';
import productRouter from '@modules/products/routes/products.routes';

const router = Router();

router.use('/products', productRouter);

router.get('/', (request, response) => {
  return response.status(200).send({
    message: 'Olá mundo',
  });
});

export default router;
