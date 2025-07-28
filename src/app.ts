// src/app.ts
import express from 'express';
import clientRoutes from './routes/clientRoutes';
// import adminRoutes from './routes/adminRoutes';
import  errorHandler  from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use('/api', clientRoutes);
// app.use('/admin', adminRoutes);
app.use(errorHandler);

export default app;
