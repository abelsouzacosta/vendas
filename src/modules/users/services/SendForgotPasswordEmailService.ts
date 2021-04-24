import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserTokenRepository } from '../infra/typeorm/repositories/UserTokenRepository';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import path from 'path';
import EtherealEmail from '@config/mail/EtherealEmailConfig';
import 'dotenv/config';

interface ISendMail {
  email: string;
}

interface IResponse {
  token: string;
  message: string | false;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: ISendMail): Promise<IResponse> {
    const userRepository: UserRepository = getCustomRepository(UserRepository);
    const tokenRepository: UserTokenRepository = getCustomRepository(
      UserTokenRepository,
    );

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const { token } = await tokenRepository.generate(user.id);

    const forgotPasswordEmailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    if (!forgotPasswordEmailTemplate)
      throw new AppError('Email template not found');

    const message = await EtherealEmail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Password Reset - Recuperação de Senha',
      templateData: {
        file: forgotPasswordEmailTemplate,
        variables: {
          name: user.name,
          link: `${process.env.HTTP_API_ADDRESS}/reset_password?token=${token}`,
        },
      },
    });

    return {
      token,
      message,
    };
  }
}
