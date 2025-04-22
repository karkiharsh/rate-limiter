// index.ts or main entry point
import { connectRedis } from '../redis/index.js';
import { crud ,addCounter} from '../redis/crud-operations.js';
import { WINDOW_SIZE, MAX_REQUESTS } from '../config/rate-limiting-rules/config.js';
// however you start your service

const INTERVAL_TIME = 10; // try changing this value and check logs
(async () => {
  try {
    await connectRedis(); // connect first
    console.log("-------------")
    console.log("creating coutner key in redis with 5 seconds ttl")
    await addCounter('counter', WINDOW_SIZE); // example usage

   const intervalId = setInterval(async () => {
   let num  : number = await addCounter('counter', 5);
   console.log("Counter incremented successfully! after .5 seconds", num);

   if(num>MAX_REQUESTS){ 
      console.log(`Counter value is greater than ${MAX_REQUESTS}, stopping incrementing.`);
      clearInterval(intervalId); 
      return;
   }else { 
      console.log("Counter value is less than 5, incrementing again.");
   }
}, INTERVAL_TIME);


  } catch (err) {
    console.error('🚨 Could not start service:', err);
    process.exit(1);
  }
})();
