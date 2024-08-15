import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
	const errorResult = validationResult(req);  // 统一从req中获取校验执行结果
	if (errorResult && errorResult.errors.length > 0) {
		//? 有存在校验不通过的情况，将不通过的情况进行统一的格式化输出
		res.failed(-1, {
			errors: errorResult.array()
		}, '请求参数有误，请检查后重新提交')
	} else {
		next()
	}
}