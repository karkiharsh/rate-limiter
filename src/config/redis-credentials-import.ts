import env from "./env-validator.js";

interface RedisCredentials {
password : string; 
host: string;
port: number;
}

const REDIS_CREDENTIALS:RedisCredentials = { 
    password: env.REDIS_PASSWORD,
    host: env.REDIS_HOST,
    port: env.REDIS_PORT
}
export {REDIS_CREDENTIALS}
