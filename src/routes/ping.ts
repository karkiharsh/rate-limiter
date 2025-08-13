import { Router, Request ,Response } from 'express';
const pingRouter = Router();

pingRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Service is healthy'
  });
});
export default pingRouter;
