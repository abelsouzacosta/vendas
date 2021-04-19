import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const repository: CustomerRepository = getCustomRepository(
      CustomerRepository,
    );

    // não pode haver dois clientes com o mesmo email dentro da
    // tabela de clientes
    const userExists = await repository.findByEmail(email);

    if (userExists) throw new AppError('This email are already been used');

    const customer = await repository.create({
      name,
      email,
    });

    await repository.save(customer);

    return customer;
  }
}
