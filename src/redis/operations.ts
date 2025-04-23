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

export {addCounter};
