import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IProduct {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IProduct): Promise<void> {
    const repository = getCustomRepository(ProductRepository);

    const product = await repository.findOne(id);

    if (!product) throw new AppError('Product not found');

    if (!(await repository.remove(product)))
      throw new AppError('Cannot remove product');
  }
}

export default DeleteProductService;
