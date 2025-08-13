import { client } from "./index.js";


const addCounter = async (key: string, ttl: number):Promise<number> => {
  const script = `
    local current = redis.call('INCR', KEYS[1])
    if current == 1 then
      redis.call('EXPIRE', KEYS[1], ARGV[1])
    end
    return current
  `; // lua scripts are evalulated as atomic operations to counter race-conditions
 
  const result = await client.eval(script, {
    keys: [key],
    arguments: [ttl.toString()],
  });
  console.log("Counter incremented successfully!", result);

return result as number; // cast to number
};

const getKeyCount = async (key: string): Promise<number> => {
  const value = await client.get(key);
  const count = value ? parseInt(value, 10) : 0;
  return Number.isNaN(count) ? 0 : count;
};

const getKeyTTL = async (key: string): Promise<number> => {
  // Returns TTL in seconds, or -2 if key does not exist, or -1 if no expire is set
  const ttl = await client.ttl(key);
  return typeof ttl === 'number' ? ttl : -2;
};

export {addCounter, getKeyCount, getKeyTTL};
