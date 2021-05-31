import 'dotenv/config';
import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const {
  NODE_ENV,
  REDIS_DOMAIN_NAME,
  REDIS_PORT_NUMBER,
  QOVERY_DATABASE_UNION_BOOTH_REDIS_HOST,
  QOVERY_DATABASE_UNION_BOOTH_REDIS_PORT,
  QOVERY_DATABASE_UNION_BOOTH_REDIS_USERNAME,
  QOVERY_DATABASE_UNION_BOOTH_REDIS_PASSWORD
} = process.env;

const isProd = NODE_ENV === 'production';

let options;

if (isProd) {
  options = {
    host: QOVERY_DATABASE_UNION_BOOTH_REDIS_HOST,
    port: QOVERY_DATABASE_UNION_BOOTH_REDIS_PORT,
    username: QOVERY_DATABASE_UNION_BOOTH_REDIS_USERNAME,
    password: QOVERY_DATABASE_UNION_BOOTH_REDIS_PASSWORD
  }
} else {
  options = {
    host: REDIS_DOMAIN_NAME,
    port: REDIS_PORT_NUMBER
  }
}

options = {
  ...options,
  retryStrategy: times => {
    return Math.min(times * 50, 2000);
  }
}

const redisClient = () => {
  return new Redis(options);
};

const pubsub = new RedisPubSub({
  publisher: redisClient(),
  subscriber: redisClient()
});

export default pubsub;