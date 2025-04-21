// index.ts or main entry point
import { connectRedis } from '../redis/index.js';
import { crud } from '../redis/crud-operations.js';
// however you start your service

(async () => {
  try {
    await connectRedis(); // connect first
    await crud(); 
  } catch (err) {
    console.error('🚨 Could not start service:', err);
    process.exit(1);
  }
})();
