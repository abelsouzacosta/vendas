import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { Product } from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

class ShowProductService {
  public async execute(id: string): Promise<Product | undefined> {
    const repository = getCustomRepository(ProductRepository);

    const product = await repository.findOne(id);

    if (!product) throw new AppError('Product not found');

    return product;
  }
}

export default ShowProductService;
