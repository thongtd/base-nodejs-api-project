import {
  IsNotEmpty,
  IsString
} from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginModel:
 *       type: object
 *       properties:
 *         userNameOrEmail:
 *           type: string
 *           example: 'thong@finatech.io'
 *         password:
 *           type: string
 *           example: 'P@ssw0rd!'
 *       required:
 *         - email
 *         - userNameOrEmail
 */
export class LoginModel {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  userNameOrEmail!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password!: string;
}