import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { User } from '../infra/typeorm/entities/User';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const repository = getCustomRepository(UserRepository);

    const user = await repository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect) throw new AppError('Password incorrect');

    const token = sign({}, String(authConfig.jwt.secret), {
      expiresIn: 86400,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
