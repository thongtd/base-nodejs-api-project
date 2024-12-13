import { ErrorCode } from '../constants/error-codes';

export class BaseResponse<T> {
  success!: boolean;
  message: string | undefined;
  code: number;
  errors: ErrorModel[] | undefined;
  data: T | undefined;

  constructor(init?: Partial<BaseResponse<T>>) {
    this.success = init?.success ?? false;
    this.message = init?.message;
    this.code = init?.code ?? ErrorCode.SUCCESS;
    this.errors = init?.errors;
    this.data = init?.data;
  }
}

export class ErrorModel {
  message: string | undefined;
  property: string | undefined;
}