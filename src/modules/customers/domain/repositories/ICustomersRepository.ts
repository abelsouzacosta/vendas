import { ICustomer } from '../models/ICustomer';
import { ICustomerCreate } from '../models/ICustomerCreate';

export interface ICustomerRepository {
  // método para encontrar uma instância por nome
  findByEmail(name: string): Promise<ICustomer | undefined>;

  // método para encontrar uma instância por id
  findById(id: string): Promise<ICustomer | undefined>;

  // método para encontrar uma instância pelo nome
  findByName(name: string): Promise<ICustomer | undefined>;

  // método para criar uma instância
  create(data: ICustomerCreate): Promise<ICustomer>;

  // salva um usuário no banco de dados
  save(customer: ICustomer): Promise<ICustomer>;
}
