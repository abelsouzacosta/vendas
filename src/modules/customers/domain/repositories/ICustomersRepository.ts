import { ICustomer } from '../models/ICustomer';
import { ICustomerCreate } from '../models/ICustomerCreate';

export interface ICustomerRepository {
  // encontra todas as instâncias de uma entidade
  find(): Promise<ICustomer[] | undefined>;

  // método para encontrar uma instância pelo email
  findByEmail(name: string): Promise<ICustomer | undefined>;

  // método para encontrar uma instância pelo id
  findById(id: string): Promise<ICustomer | undefined>;

  // método para encontrar uma instância pelo nome
  findByName(name: string): Promise<ICustomer | undefined>;

  // método para criar uma instância
  create(data: ICustomerCreate): Promise<ICustomer>;

  // salva um usuário no banco de dados
  save(customer: ICustomer): Promise<ICustomer>;

  // deleta uma instância do banco de dados
  remove(customer: ICustomer): Promise<void>;
}
