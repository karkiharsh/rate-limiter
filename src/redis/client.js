import { createClient } from 'redis';
import {redisConnectionObj} from '../exports.js'
const client = createClient({
    username: 'default',
    password: redisConnectionObj.password,
    socket: {
        host: redisConnectionObj.host,
        port: redisConnectionObj.port,
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

