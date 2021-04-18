import { RedisOptions } from 'ioredis';
import 'dotenv/config';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST || undefined,
      port: process.env.REDIS_PORT || undefined,
      password: process.env.REDIS_PASS || undefined,
    },
  },
  driver: 'redis',
} as ICacheConfig;
