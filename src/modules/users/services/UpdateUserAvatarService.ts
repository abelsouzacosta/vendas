import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ id, avatarFilename }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);

    const user = await repository.findById(id);

    if (!user) throw new AppError('User not found');

    if (user.avatar) {
      const userAvatarFilepath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilepath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilepath);
    }

    user.avatar = avatarFilename;

    await repository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
