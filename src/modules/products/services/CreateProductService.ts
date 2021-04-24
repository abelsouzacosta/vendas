import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import RedisCache from '@shared/cache/RedisCache';

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IProduct): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);
    const productExists = await repository.findByName(name);
    const redis = new RedisCache();

    if (productExists)
      throw new AppError('Cannot create. Product already exists');

    const product = await repository.create({
      name,
      price,
      quantity,
    });

    if (!(await repository.save(product)))
      throw new AppError('Cannot save Product instance');

    // invalidando a chave pois houve a inserção de um outro
    // produto, o primeiro usuário que fizer a próxima
    // requisição será responsável por criar o cache
    await redis.invalidate('api_vendas-products-on-memory-cache');

    return product;
  }
}

export default CreateProductService;
