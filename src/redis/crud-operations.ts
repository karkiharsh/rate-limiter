import { client } from "./index.js";



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
export { crud };
