import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomersService';
import UdpateCustomerService from '../../../services/UpdateCustomerService';
import { container } from 'tsyringe';

export default class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const list = container.resolve(ListCustomerService);

    const customers = await list.execute();

    return response.status(200).json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const create = container.resolve(CreateCustomerService);

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const delete_customer = new DeleteCustomerService();

    await delete_customer.execute({ id });

    return response.status(200).json([]);
  }
}
