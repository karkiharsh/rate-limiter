// src/app.ts
import express from 'express';
import clientRoutes from './routes/clientRoutes';
import adminRoutes from './routes/adminRoutes';
import healthRoutes from './routes/ping';
import  errorHandler  from './middlewares/errorHandler';
const app = express();
app.use(express.json());
app.use('/api', clientRoutes);
app.use('/admin', adminRoutes);
app.use('/healthRoutes', healthRoutes);
app.use(errorHandler);
export default app;
