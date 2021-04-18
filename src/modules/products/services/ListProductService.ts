import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { Product } from '../typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[] | undefined> {
    const repository = getCustomRepository(ProductRepository);

    const redis = new RedisCache();

    let products = await redis.recover<Product[]>(
      'api_vendas-products-on-memory-cache',
    );

    // se não houver nada em memória cache
    // então faz a busca pelo repositorio e
    // grava os dados no cache
    if (!products) {
      products = await repository.find();

      await redis.save('api_vendas-products-on-memory-cache', products);
    }

    return products;
  }
}

export default ListProductService;
