import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/auth.controller';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     responses:
 *       200:
 *         description: User registered successfully.
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user and returns a JWT token.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
router.post('/login', login);

export default router;