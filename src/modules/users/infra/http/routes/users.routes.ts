import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const controller = new UsersController();
const upload = multer(uploadConfig);
const usersAvatarController = new UserAvatarController();

userRouter.get('/', isAuthenticated, controller.index);

userRouter.post('/', controller.create);

userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default userRouter;
