import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { Product } from '../typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IProduct): Promise<Product | undefined> {
    const repository = getCustomRepository(ProductRepository);

    const product = await repository.findOne(id);

    if (!product) throw new AppError('Product not found');

    const productExists = await repository.findByName(name);

    if (productExists)
      throw new AppError(
        'Cannot update product instance. Theres already a product with this name',
      );

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    if (!(await repository.save(product)))
      throw new AppError('Cannot update product instance');

    return product;
  }
}

export default UpdateProductService;
