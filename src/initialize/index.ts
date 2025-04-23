// index.ts or main entry point
import { connectRedis } from '../redis/index.js';
import { crud ,addCounter} from '../redis/crud-operations.js';
import { WINDOW_SIZE, MAX_REQUESTS } from '../config/rate-limiting.js';
import { port } from '../config/local-server.js'; // import your port from env-validator or config
import { startServer } from '../orchestrate/server.js';
// however you start your service

const INTERVAL_TIME = 10; // try changing this value and check logs
const initialize = async () => {
  try {
    console.log('Establishing connection to Redis...');

    let intervalId = setInterval(() => {console.log('.'); },400);

    await connectRedis();
    clearInterval(intervalId);

    console.log('Spinning up the server...');

    intervalId = setInterval(() => {console.log('.')  },100);

    await startServer(); 
    clearInterval(intervalId);
    console.log('---');      

  } catch (err) {
    console.error('🚨 Could not start service:', err);
    process.exit(1);
  }
};
initialize(); 
