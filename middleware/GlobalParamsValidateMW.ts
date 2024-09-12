
import { LogicResult } from '@/enum/http';
import { Request, Response, NextFunction } from 'express';
import { ValidateError } from 'tsoa';

// 自定义全局错误处理中间件
export default function globalParamsValidate(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidateError) {
    // 捕获tsoa的参数验证错误
		res.failed(LogicResult.PARAMS_ERROR, {}, req.t('tip.paramsError'))
  }
  next();
}