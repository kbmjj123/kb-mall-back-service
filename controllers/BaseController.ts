import { BaseObjectEntity } from "@/entity/BaseObjectEntity";
import { LogicResult } from "@/enum/http";
import { Request as ExpressRequest } from "express";
import { Controller } from "tsoa";

/**
 * 基础控制器类
*/
export class BaseController extends Controller{

	protected successResponse<T>(req: ExpressRequest, data: T, message: string = ''): BaseObjectEntity<T> {
		return {
			status: LogicResult.SUCCESS,
			message,
			data
		}
	}

	protected failedResponse<T>(req: ExpressRequest, message: string = '', data?: T): BaseObjectEntity<T> {
		return {
			status: LogicResult.FAILED,
			message,
			data
		}
	}

}