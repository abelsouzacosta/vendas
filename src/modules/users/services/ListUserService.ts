import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { User } from '../infra/typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<User[]> {
    const repository = getCustomRepository(UserRepository);

    const users = await repository.find();

    if (!users) throw new AppError('No users were found');

    return users;
  }
}

export default ListUserService;
