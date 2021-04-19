import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/Orders';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne({
      where: {
        id,
      },
    });

    return order;
  }
}
