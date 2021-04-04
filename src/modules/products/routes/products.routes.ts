import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productRouter = Router();
const controller = new ProductsController();

productRouter.get('/', controller.index);

productRouter.get('/:id', controller.show);

productRouter.post('/', controller.create);

productRouter.put('/:id', controller.update);

productRouter.delete('/:id', controller.delete);

export default productRouter;
