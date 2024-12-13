import { Request, Response } from 'express';
import { RegisterModel } from '../models/customers/register.model';
import { CustomerService } from '../services/customers/customer.service';
import { LoginModel } from '../models/customers/login.model';
import { ChangePasswordModel } from '../models/customers/change-password.model';
import * as JWTService from '../services/jwt/jwt.service';
import { ErrorMessage } from '../constants/error-message';

const customerService = new CustomerService();

/**
 * @swagger
 * /api/customers/register:
 *   post:
 *     summary: Register a new customer
 *     description: Creates a new customer account.
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterModel'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Validation error or registration failed.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const registerModel = Object.assign(new RegisterModel(), req.body);

  try {
    const result = await customerService.register(registerModel);
    res.status(201).json(result);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * @swagger
 * /api/customers/login:
 *   post:
 *     summary: Customer login
 *     description: Customer login
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginModel'
 *     responses:
 *       201:
 *         description: User login successfully.
 *       400:
 *         description: Validation error or login failed.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const loginModel = Object.assign(new LoginModel(), req.body);

  try {
    const result = await customerService.login(loginModel);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/customers/refresh-token:
 *   post:
 *     summary: Generate a new access token using refresh token
 *     description: Validates the refresh token and returns a new access token.
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: 'your_refresh_token_here'
 *     responses:
 *       200:
 *         description: New access token generated.
 *       400:
 *         description: Invalid or expired refresh token.
 */
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({
      success: false,
      message: 'Refresh token is required',
    });
  }

  const result = await customerService.refreshToken(refreshToken);
  if (!result.success) {
    res.status(400).json(result);
  }

  res.status(200).json(result);
};


/**
 * @swagger
 * /api/customers/change-password:
 *   post:
 *     summary: Customer change password
 *     description: Customer change password
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordModel'
 *     responses:
 *       201:
 *         description: User change password successfully.
 *       400:
 *         description: Validation error or change password failed.
 */
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  const changePasswordModel = Object.assign(new ChangePasswordModel(), req.body);
  var jwtTokenPayload = JWTService.parseTokenFromHeader(req);
  if (jwtTokenPayload == null) {
    res.status(400).json({ message: ErrorMessage.UNAUTHORIZED });
    return;
  }

  try {
    const result = await customerService.changePassword(jwtTokenPayload?.id, changePasswordModel);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};