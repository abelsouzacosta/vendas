import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import { hash } from 'bcryptjs';

interface IUser {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IUser): Promise<User | undefined> {
    const repository = getCustomRepository(UserRepository);
    const userExists = await repository.findByEmail(email);

    if (userExists) throw new AppError('Email already in use');

    const hashedPassword = await hash(password, 8);

    const user = await repository.create({
      name,
      email,
      password: hashedPassword,
    });

    await repository.save(user);

    return user;
  }
}

export default CreateUserService;
