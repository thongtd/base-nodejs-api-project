import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

import { AppDataSource } from './config/database.config';
import authRoutes from './routes/auth.route';
import customerRoutes from './routes/customer.route';
import swaggerRouter from './middleware/swagger.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database Connection
AppDataSource.initialize()
  .then(() => console.log('Database connected successfully'))
  .catch((error: Error) => console.error('Database connection error:', error));

// Swagger Documentation
app.use(swaggerRouter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// Middleware xử lý lỗi
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ success: false, message: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
