import AppError from '@shared/errors/AppError';
import { ICustomerUpdate } from '../domain/models/ICustomerUpdate';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class UdpateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: ICustomerUpdate): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) throw new AppError('This customer does not exists');

    // caso o cliente seja encontrado

    // verifica se o campo email foi preenchido
    if (email) {
      const customerByEmail = await this.customerRepository.findByEmail(email);

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

    await this.customerRepository.save(customer);

    return customer;
  }
}
