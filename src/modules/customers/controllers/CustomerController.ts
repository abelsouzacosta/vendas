import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import ListCustomerService from '../services/ListCustomersService';
import UdpateCustomerService from '../services/UpdateCustomerService';

export default class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const list = new ListCustomerService();

    const customers = await list.execute();

    return response.status(200).json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const create = new CreateCustomerService();

    const customer = await create.execute({ name, email });

    return response.status(200).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const update = new UdpateCustomerService();

    const customer = await update.execute({ id, name, email });

    return response.status(200).json(customer);
  }
}