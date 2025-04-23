import express, { Request, Response } from 'express';
import { port } from '../config/local-server.js';
const app = express();

app.get('/', (req: Request, res: Response) => {

  console.log('hit');
  res.send('Hello World with TypeScript!');
});
async function startServer() {
  try {
    await new Promise<void>((resolve, reject) => {
      app.listen(port, (err?: Error) => {
        if (err) {
          reject(err);
          return;
        }
        console.log(`Server listening at http://localhost:${port}`);
        resolve();
      });
    });

    // You can now proceed with other tasks that depend on the server being up
    // ...
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

export {startServer}; 