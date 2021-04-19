import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const create = new CreateOrderService();

    const order = await create.execute({ customer_id, products });

    return response.status(200).json(order);
  }
}
