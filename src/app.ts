// src/app.ts
import express from 'express';
import clientRoutes from './routes/clientRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import healthRoutes from './routes/ping.js';
import  errorHandler  from './middlewares/errorHandler.js';
const app = express();
app.use(express.json());
app.use('/api', clientRoutes);
app.use('/admin', adminRoutes);
app.use('/healthRoutes', healthRoutes);
app.use(errorHandler);
export default app;
