import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const show = new ShowOrderService();

    const order = await show.execute({ id });

    return response.status(200).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const create = new CreateOrderService();

    const order = await create.execute({ customer_id, products });

    return response.status(200).json(order);
  }
}
