import type { Request, Response, NextFunction } from 'express'
import { LogicResult } from '@/enum/http'; 

const SUCCESS_FLAG = LogicResult.SUCCESS;
const SUCCESS_MSG = '操作成功'
const FAILED_FLAG = LogicResult.FAILED;
const FAILED_MSG = '操作失败'

export default (req: Request, res: Response, next: NextFunction) => {
	// 追加自定义统一的成功响应方法
	res.success = function (payload = null, msg = '') {
		return res.json({
			status: SUCCESS_FLAG,
			data: payload,
			message: msg || SUCCESS_MSG
		})
	}
	// 追加自定义统一失败的响应方法，额外追加响应结果枚举，主要用于响应业务逻辑失败的场景
	res.failed = function (status = LogicResult.FAILED, payload = null, msg = '') {
		return res.json({
			status: status || FAILED_FLAG,
			data: payload,
			message: msg || FAILED_MSG
		})
	}
	next()
}