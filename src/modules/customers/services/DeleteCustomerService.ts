import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository: CustomerRepository = getCustomRepository(
      CustomerRepository,
    );

    const customer = await repository.findById(id);

    if (!customer) throw new AppError('Customer not found');

    await repository.remove(customer);
  }
}
