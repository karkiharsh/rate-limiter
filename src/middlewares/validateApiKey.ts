import { Request, Response, NextFunction } from 'express';

export const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey) return res.status(401).json({ error: 'Missing API key' });
  // Load client from Redis, attach to req
  next();
};
