// redis-client.ts
import { createClient } from 'redis';
import { REDIS_CREDENTIALS } from '../config/redis/redis-config.js';

const client = createClient({
  username: 'default',
  password: REDIS_CREDENTIALS.password,
  socket: {
    host: REDIS_CREDENTIALS.host,
    port: REDIS_CREDENTIALS.port,
  },
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// Export the raw client and a function to connect it
export async function connectRedis() {
  await client.connect();
  console.log('✅ Redis connected');
}

export { client };
