import 'dotenv/config';
import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const {
  NODE_ENV,
  REDIS_DOMAIN_NAME,
  REDIS_PORT_NUMBER,
  QOVERY_DATABASE_UNION_BOOTH_REDIS_HOST,
  QOVERY_DATABASE_UNION_BOOTH_REDIS_PORT
} = process.env;

const isProd = NODE_ENV === 'production';

const options = {
  host: isProd ? QOVERY_DATABASE_UNION_BOOTH_REDIS_HOST : REDIS_DOMAIN_NAME,
  port: isProd ? QOVERY_DATABASE_UNION_BOOTH_REDIS_PORT : REDIS_PORT_NUMBER,
  retryStrategy: times => {
    return Math.min(times * 50, 2000);
  }
};

const redisClient = () => {
  return new Redis(options);
};

const pubsub = new RedisPubSub({
  publisher: redisClient(),
  subscriber: redisClient()
});

export default pubsub;