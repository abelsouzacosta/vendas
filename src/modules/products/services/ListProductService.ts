import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { Product } from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

class ListProductService {
  public async execute(): Promise<Product[] | undefined> {
    const repository = getCustomRepository(ProductRepository);

    const products = await repository.find();

    if (!products) throw new AppError('No products found');

    return products;
  }
}

export default ListProductService;
