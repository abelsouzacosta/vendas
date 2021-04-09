import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const controller = new UsersController();
const upload = multer(uploadConfig);
const usersAvatarController = new UserAvatarController();

userRouter.use(isAuthenticated);

userRouter.get('/', controller.index);

userRouter.post('/', controller.create);

userRouter.patch(
  '/avatar',
  upload.single('avatar'),
  usersAvatarController.update,
);

export default userRouter;
