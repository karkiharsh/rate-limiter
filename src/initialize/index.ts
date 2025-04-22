// index.ts or main entry point
import { connectRedis } from '../redis/index.js';
import { crud ,addCounter} from '../redis/crud-operations.js';
import { WINDOW_SIZE, MAX_REQUESTS } from '../config/rate-limiting-rules/config.js';
// however you start your service

const INTERVAL_TIME = 10; // try changing this value and check logs
const initialize = async () => {
  try {
    console.log('Establishing connection to Redis...');
    await connectRedis(); // connect first

  } catch (err) {
    console.error('🚨 Could not start service:', err);
    process.exit(1);
  }
};
initialize(); 
