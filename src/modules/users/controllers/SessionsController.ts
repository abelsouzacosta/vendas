import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const session = new CreateSessionService();

    const user = await session.execute({ email, password });

    return response.status(200).json(user);
  }
}
