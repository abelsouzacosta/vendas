import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { Product } from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IProduct): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);
    const productExists = await repository.findByName(name);

    if (productExists)
      throw new AppError('Cannot create. Product already exists');

    const product = await repository.create({
      name,
      price,
      quantity,
    });

    if (!(await repository.save(product)))
      throw new AppError('Cannot save Product instance');

    return product;
  }
}

export default CreateProductService;
