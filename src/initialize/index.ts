// index.ts or main entry point
import { connectRedis } from '../redis/index.js';
// however you start your service

(async () => {
  try {
    await connectRedis(); // connect first
  } catch (err) {
    console.error('🚨 Could not start service:', err);
    process.exit(1);
  }
})();
