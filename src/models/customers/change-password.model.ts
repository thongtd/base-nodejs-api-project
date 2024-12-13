import {
  IsString,
  MinLength,
  Matches,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import 'dotenv/config';

var regex = process.env.PASSWORD_REGEX || '';
const PASSWORD_REGEX = new RegExp(regex);

/**
 * @swagger
 * components:
 *   schemas:
 *     ChangePasswordModel:
 *       type: object
 *       properties:
 *         oldPassword:
 *           type: string
 *           example: 'P@ssw0rd!'
 *         password:
 *           type: string
 *           example: 'P@ssw0rd!'
 *         rePassword:
 *           type: string
 *           example: 'P@ssw0rd!'
 *       required:
 *         - oldPassword
 *         - password
 *         - rePassword
 */
export class ChangePasswordModel {
  @IsString()
  oldPassword!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password!: string;

  @IsNotEmpty({ message: 'Password confirmation is required' })
  @IsString()
  @ValidateIf((object, value) => value === object.password)
  rePassword!: string;
}