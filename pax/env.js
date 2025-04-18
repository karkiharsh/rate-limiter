import { config } from 'dotenv';
import { cleanEnv, str, port } from 'envalid';
// Load environment variables from .env file
config();
// Define the expected environment variables and their types using envalid
const env = cleanEnv(process.env, {
    REDIS_PASSWORD: str(),
    REDIS_HOST: str(),
    REDIS_PORT: port(), // Use the 'port()' validator to ensure it's a valid port number
});
console.log(env);
// Export the validated environment variables
export default env;
