import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';
import { Customer } from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
}

export default class UdpateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const repository: CustomerRepository = getCustomRepository(
      CustomerRepository,
    );

    const customer = await repository.findById(id);

    if (!customer) throw new AppError('This customer does not exists');

    // caso o cliente seja encontrado

    // verifica se o campo email foi preenchido
    if (email) {
      const customerByEmail = await repository.findByEmail(email);

      // verifica se o email já está sendo utilizado
      if (customerByEmail && customerByEmail.id !== customer.id)
        throw new AppError('This email are already been used');

      customer.email = email;
    }

    // email não está cadastrado

    // verifica se o campo name foi preenchido
    if (name) {
      customer.name = name;
    }

    await repository.save(customer);

    return customer;
  }
}
