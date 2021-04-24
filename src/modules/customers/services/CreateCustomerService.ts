import AppError from '@shared/errors/AppError';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerCreate } from '../domain/models/ICustomerCreate';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ name, email }: ICustomerCreate): Promise<ICustomer> {
    // não pode haver dois clientes com o mesmo email dentro da
    // tabela de clientes
    const userExists = await this.customerRepository.findByEmail(email);

    if (userExists) throw new AppError('This email are already been used');

    const customer = await this.customerRepository.create({
      name,
      email,
    });

    return customer;
  }
}
