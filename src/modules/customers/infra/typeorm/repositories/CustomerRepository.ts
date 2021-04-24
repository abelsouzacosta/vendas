import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { Customer } from '../entities/Customer';
import { getRepository, Repository } from 'typeorm';
import { ICustomerCreate } from '@modules/customers/domain/models/ICustomerCreate';

export class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async create({ name, email }: ICustomerCreate): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async find(): Promise<Customer[] | undefined> {
    const customers = this.ormRepository.find();

    return customers;
  }
}
