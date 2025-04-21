import { client } from "./index.js";


const addCounter = async (key: string, ttl: number) => {
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
};
const  crud = async ()=> { 
    console.log(" Trying crud operations....")
    try {

        await client.set('username', 'chatgpt');
        console.log(" Value set successfully!");
        let username : string | null  = await client.get('username');
        console.log(" Value retrieved successfully! ", username);
    
      } catch (err) {
        console.error('🚨 Could not set value ', err);
        process.exit(1);
      }
}
export { crud , addCounter };
