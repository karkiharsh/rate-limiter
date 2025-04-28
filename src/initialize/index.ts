// index.ts or main entry point
import { connectRedis } from '../redis/index.js';
import { port } from '../config/local-server.js'; // import your port from env-validator or config
import { startServer } from '../orchestrate/start-server.js';
import { loadYamlFile } from '../orchestrate/load-rules.js';
// however you start your service
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Boilerplate to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Build absolute path to your YAML file
const RULE_FILE_PATH = join(__dirname, '../../rules.yaml');

const initialize = async () => {
  try {
    console.log(' Loading rules from persistent storage...'); 
    let intervalId = setInterval(() => {console.log('.'); },400);

    const rules = await loadYamlFile(RULE_FILE_PATH);
    console.log('Rules loaded:', rules); 
    clearInterval(intervalId);

    console.log('Establishing connection to Redis...');
    intervalId = setInterval(() => {console.log('.'); },400);

    await connectRedis();
    clearInterval(intervalId);

    console.log('Spinning up the server...');
    intervalId = setInterval(() => {console.log('.')  },400);

    await startServer(); 
    clearInterval(intervalId);
    console.log('---');      

  } catch (err) {
    console.error('🚨 Could not start service:', err);
    process.exit(1);
  }
};
initialize(); 
