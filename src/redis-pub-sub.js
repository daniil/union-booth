import 'dotenv/config';
import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const { REDIS_DOMAIN_NAME, REDIS_PORT_NUMBER } = process.env;

const options = {
  host: REDIS_DOMAIN_NAME,
  port: REDIS_PORT_NUMBER,
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