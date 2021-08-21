import 'dotenv/config';
import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const {
  NODE_ENV,
  ENV_TYPE,
  REDIS_DOMAIN_NAME,
  REDIS_PORT_NUMBER,
  PROD_REDIS_HOST,
  PROD_REDIS_PORT,
  PROD_REDIS_PASSWORD,
  PROD_REDIS_DATABASE
} = process.env;

const isProd = NODE_ENV === 'production';

let options;

if (isProd) {
  if (ENV_TYPE === 'qovery') {
    options = {
      host: PROD_REDIS_HOST,
      port: PROD_REDIS_PORT,
      password: PROD_REDIS_PASSWORD,
      db: PROD_REDIS_DATABASE
    }
  } else {
    // Custom production config
    options = {
      host: REDIS_DOMAIN_NAME,
      port: REDIS_PORT_NUMBER
    }
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