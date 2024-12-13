import { Router } from 'express';
import * as customerController from '../controllers/customer.controller';
import { validateRequest } from '../middleware/validate-request.middleware';
import { RegisterModel } from '../models/customers/register.model';
import { LoginModel } from '../models/customers/login.model';
import { ChangePasswordModel } from '../models/customers/change-password.model';

const router = Router();

router.post('/register', validateRequest(RegisterModel), customerController.register);
router.post('/login', validateRequest(LoginModel), customerController.login);
router.post('/refresh-token', customerController.refreshToken);
router.post('/change-password', validateRequest(ChangePasswordModel), customerController.changePassword);

export default router;