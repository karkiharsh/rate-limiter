// src/middlewares/validateAdminKey.ts
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const ADMIN_KEY = process.env.ADMIN_KEY;

export const validateAdminKey = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.header('x-admin-key');
  if (!adminKey || adminKey !== ADMIN_KEY) {
    return res.status(403).json({ error: 'Forbidden. Invalid admin key.' });
  }
  next();
};
