import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { compare } from 'bcryptjs';
import { User } from '../typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);

    const user = await repository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect) throw new AppError('Password incorrect');

    return user;
  }
}

export default CreateSessionService;
