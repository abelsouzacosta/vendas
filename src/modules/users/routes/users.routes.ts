import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const userRouter = Router();
const controller = new UsersController();

userRouter.use(isAuthenticated);

userRouter.get('/', controller.index);

userRouter.post('/', controller.create);

export default userRouter;
