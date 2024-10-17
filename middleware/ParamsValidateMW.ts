import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { ResultCode } from '../enum/http';

export default function (req: Request, res: Response, next: NextFunction) {
	const errorResult = validationResult(req);  // 统一从req中获取校验执行结果
	if (errorResult && errorResult.array().length > 0) {
		//? 有存在校验不通过的情况，将不通过的情况进行统一的格式化输出
		res.failed(ResultCode.PARAMS_ERROR, {
			errors: errorResult.array()
		}, req.t('tip.paramsError'))
	} else {
		next()
	}
}