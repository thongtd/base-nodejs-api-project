import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BaseResponse, ErrorModel } from '../models/base-response';
import { ErrorCode } from '../constants/error-codes';

export const validateRequest = (modelClass: new () => object) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(modelClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const errorModels: ErrorModel[] = errors.map((err) => ({
        property: err.property,
        message: Object.values(err.constraints || {})[0],
      }));

      const response = new BaseResponse({
        success: false,
        message: 'Validation failed',
        code: ErrorCode.FAILED,
        errors: errorModels,
      });

      res.status(400).json(response);
    } else {
      req.body = dtoInstance;
      next();
    }
  };
};