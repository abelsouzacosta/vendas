import AppError from '@shared/errors/AppError';
import cacheConfig from '@config/cache';
import Redis, { Redis as RedisClient } from 'ioredis';

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    // antes de determinar a chave é preciso
    // transformar o objeto em uma string
    this.client.set(key, JSON.stringify(value));
  }

  // método que recupera os valores guardados em cache
  // é um método que usa generics, pois a principio não se
  // sabe o tipo de dados que serão guardados em memória
  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) return null;

    return JSON.parse(data);
  }

  // método responsável por apagar da memória
  // a chave passada por parametro e consequentemente o seu valor
  // usado em servicos de alteração do dominio (create, update, delete)
  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
