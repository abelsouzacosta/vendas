import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ResetPasswordController {
  public async forgot(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendMail = new SendForgotPasswordEmailService();

    const message = await sendMail.execute({ email });

    return response.json(message);
  }

  public async reset(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const reset = new ResetPasswordService();

    const ok = await reset.execute({ token, password });

    return response.json(ok);
  }
}
