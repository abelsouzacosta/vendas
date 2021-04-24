import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';
import { Customer } from '../infra/typeorm/entities/Customer';
import { ICustomer } from '../domain/models/ICustomer';
import { injectable, inject } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export default class ListCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(): Promise<ICustomer[]> {
    const customers = await this.customerRepository.find();

    if (!customers)
      throw new AppError('No customers were found in the database');

    return customers;
  }
}
