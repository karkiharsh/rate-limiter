import dotenv from 'dotenv';
dotenv.config();
 const Password= process.env.PASSWORD;
 const Host  = process.env.HOST;
 const Port  = process.env.PORT;
 export const redisConnectionObj = { 
    password: Password,
    host: Host,
    port: Port
}
console.log(redisConnectionObj)
