import express, { Request, Response } from 'express';
import { port } from '../config/local-server.js';
import { rateLimit } from './rate-limit.js';
const app = express();

async function startServer() {
  try {
    await new Promise<void>((resolve, reject) => {
      app.listen(port, (err?: Error) => {
        if (err) {
          reject(err);
          return;
        }
          resolve();
      });
    });
    
    console.log(`Server listening at http://localhost:${port}`);
    // You can now proceed with other tasks that depend on the server being up
    // ...
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}
app.get('/', async (req: Request, res: Response) => {


  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const isAllowed = await rateLimit(ip);
  console.log(`IP: ${ip}, Allowed: ${isAllowed}`);
  if(isAllowed){
     res.status(200).send('Hit');
     console.log("---");
     return;
  }
   res.status(429).send('Rate limit exceeded. Try again later.');
});
export {app,startServer}; 