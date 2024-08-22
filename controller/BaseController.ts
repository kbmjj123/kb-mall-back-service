import { BaseObjectEntity } from "@/entity/BaseObjectEntity";
import { LogicResult } from "@/enum/http";
import { Request as ExpressRequest } from "express";
import { Controller } from "tsoa";

/**
 * 基础控制器类
*/
export class BaseController extends Controller{

	protected successResponse<T>(req: ExpressRequest, data: T, message?: string) {
		return new BaseObjectEntity<T>(data, LogicResult.SUCCESS, message)
	}

	protected failedResponse<T>(req: ExpressRequest, data: T, message?: string) {
		return {
			status: LogicResult.FAILED,
			data,
			message: message || req.t('tip.failed')
		}
	}

}