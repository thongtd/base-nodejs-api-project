import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import 'dotenv/config';

import { AppDataSource } from '../../config/database.config';
import { Customer } from '../../entities/customers/customers.entity';
import { RegisterModel } from '../../models/customers/register.model';
import { LoginModel } from '../../models/customers/login.model';
import { ChangePasswordModel } from '../../models/customers/change-password.model';
import { BaseResponse } from '../../models/base-response';
import { ErrorCode } from '../../constants/error-codes';
import * as JWTService from '../jwt/jwt.service';

export class CustomerService {
  private customerRepository = AppDataSource.getRepository(Customer);

  async register(registerModel: RegisterModel): Promise<BaseResponse<object>> {
    const normalizedUserName = registerModel.email.toLowerCase();
    const normalizedEmail = registerModel.email.toLowerCase();

    const existingUser = await this.customerRepository.findOneBy([
      { normalized_user_name: normalizedUserName },
      { normalized_email: normalizedEmail },
    ]);

    if (existingUser) {
      return new BaseResponse<object>({
        success: false,
        message: 'Username or email already exists',
        code: ErrorCode.FAILED
      });
    }

    const securityStamp = randomBytes(16).toString('hex');
    const passwordToHash = registerModel.password + securityStamp;
    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    const customer = this.customerRepository.create({
      user_name: registerModel.email,
      normalized_user_name: normalizedUserName,
      email: registerModel.email,
      normalized_email: normalizedEmail,
      password_hash: hashedPassword,
      security_stamp: securityStamp,
      full_name: registerModel.fullName,
      email_confirmed: false,
      phone_number_confirmed: false,
      is_default_password: false,
      access_failed_count: 0,
    });

    await this.customerRepository.save(customer);
    return new BaseResponse<object>({
      success: true,
      message: 'Register user successful',
      code: ErrorCode.SUCCESS,
      data: {
        customer_id: customer.id
      }
    });
  }

  async login(loginModel: LoginModel): Promise<BaseResponse<object>> {
    const normalizedInput = loginModel.userNameOrEmail.toLowerCase();

    const customer = await this.customerRepository.findOneBy([
      { normalized_user_name: normalizedInput },
      { normalized_email: normalizedInput },
    ]);

    if (!customer) {
      return new BaseResponse<object>({
        success: false,
        message: 'Invalid username or password',
        code: ErrorCode.FAILED
      });
    }

    const passwordToCheck = loginModel.password + customer.security_stamp;
    const isPasswordValid = await bcrypt.compare(passwordToCheck, customer.password_hash || '');
    if (!isPasswordValid) {
      return new BaseResponse<object>({
        success: false,
        message: 'Invalid username or password',
        code: ErrorCode.FAILED
      });
    }

    const accessToken = JWTService.generateToken({
      id: customer.id,
      userName: customer.user_name,
      email: customer.email,
    });

    const refreshToken = JWTService.generateRefreshToken({
      id: customer.id,
      userName: customer.user_name,
      email: customer.email,
    });

    return new BaseResponse<object>({
      success: true,
      message: 'Login successful',
      code: ErrorCode.SUCCESS,
      data: {
        customer_id: customer.id,
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  }

  async refreshToken(refreshToken: string): Promise<BaseResponse<object>> {
    try {
      const decoded = JWTService.verifyToken(refreshToken);
      const customer = await this.customerRepository.findOneBy({ id: decoded.id });

      if (!customer) {
        return new BaseResponse<object>({
          success: false,
          message: 'Invalid refresh token',
          code: ErrorCode.FAILED,
        });
      }

      const accessToken = JWTService.generateRefreshToken({
        id: customer.id,
        userName: customer.user_name,
        email: customer.email,
      });

      return new BaseResponse<object>({
        success: true,
        message: 'New access token generated',
        code: ErrorCode.SUCCESS,
        data: {
          access_token: accessToken,
        },
      });
    } catch (error) {
      return new BaseResponse<object>({
        success: false,
        message: 'Invalid or expired refresh token',
        code: ErrorCode.FAILED,
      });
    }
  }

  async changePassword(customerId: number, changePasswordModel: ChangePasswordModel) {
    const customer = await this.customerRepository.findOneBy({ id: customerId });

    if (!customer) {
      throw new Error('User not found');
    }

    const passwordToCheck = changePasswordModel.oldPassword + customer.security_stamp;
    const isPasswordValid = await bcrypt.compare(passwordToCheck, customer.password_hash || '');
    if (!isPasswordValid) {
      throw new Error('Old password is incorrect');
    }

    const newSecurityStamp = randomBytes(16).toString('hex');
    const newPasswordToHash = changePasswordModel.password + newSecurityStamp;
    customer.password_hash = await bcrypt.hash(newPasswordToHash, 10);
    customer.security_stamp = newSecurityStamp;
    customer.is_default_password = false;

    await this.customerRepository.save(customer);
    return { message: 'Password changed successfully' };
  }

  async updateProfile(customerId: number, updateData: Partial<Customer>) {
    const customer = await this.customerRepository.findOneBy({ id: customerId });

    if (!customer) {
      throw new Error('User not found');
    }

    Object.assign(customer, updateData);

    await this.customerRepository.save(customer);
    return { message: 'Profile updated successfully', customer };
  }
}