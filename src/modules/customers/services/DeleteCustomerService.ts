import AppError from '@shared/errors/AppError';
import { ICustomerDelete } from '../domain/models/ICustomerDelete';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {}

  public async execute({ id }: ICustomerDelete): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) throw new AppError('Customer not found');

    await this.customerRepository.remove(customer);
  }
}
