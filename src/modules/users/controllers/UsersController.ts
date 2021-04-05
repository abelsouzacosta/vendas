import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const create = new CreateUserService();

    const user = await create.execute({ name, email, password });

    return response.status(200).json(user);
  }
}
