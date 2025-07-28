import { createClient } from 'redis';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

if (!REDIS_HOST || !REDIS_PORT) {
  throw new Error('Missing required Redis environment variables');
}

const redisClient = createClient({
  url: `redis://:${REDIS_PASSWORD ?? ''}@${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on('error', (err) => console.error('Redis error', err));

await redisClient.connect();

export { redisClient };
