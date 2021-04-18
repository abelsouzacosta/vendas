import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<boolean> {
    const tokenRepository: UserTokenRepository = getCustomRepository(
      UserTokenRepository,
    );
    const userRepository: UserRepository = getCustomRepository(UserRepository);

    const generatedToken = await tokenRepository.findByToken(token);

    // verifica se o token existe
    if (!generatedToken)
      throw new AppError('Theres no token like this in our application');

    // verifica se o token já foi utilizado
    if (generatedToken.is_used)
      throw new AppError('This token are alredy been used');

    const generatedTokenTime = generatedToken.created_at;
    const compareTime = addHours(generatedTokenTime, 2);

    // verifica se o token ainda está valido
    // cada token tem uma validade de duas horas
    if (isAfter(Date.now(), compareTime))
      throw new AppError(
        'Token expired please try again\nGenerate another token',
      );

    // busca pelo usuário apartir do user_id do generatedToken
    const user = await userRepository.findById(generatedToken.user_id);

    if (!user) throw new AppError('Theres an error: This user does not exists');

    // hash de password
    const hashPass = await hash(password, 10);

    user.password = hashPass;

    if (!(await userRepository.save(user)))
      throw new AppError('Theres an error: Cannot save user');

    return true;
  }
}
