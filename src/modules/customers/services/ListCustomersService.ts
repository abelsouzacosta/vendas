import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';
import { Customer } from '../typeorm/entities/Customer';

export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const repository: CustomerRepository = getCustomRepository(
      CustomerRepository,
    );

    const customers = await repository.find();

    if (!customers)
      throw new AppError('No customers were found in the database');

    return customers;
  }
}
