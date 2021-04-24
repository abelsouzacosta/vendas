import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { Order } from '../infra/typeorm/entities/Orders';

interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const repository: OrdersRepository = getCustomRepository(OrdersRepository);

    const order = await repository.findById(id);

    if (!order) throw new AppError('This order does not exists');

    return order;
  }
}
