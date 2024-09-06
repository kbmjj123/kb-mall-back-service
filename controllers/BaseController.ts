import { BaseObjectEntity } from "@/entity/BaseObjectEntity";
import { BasePageListEntity, PageListType } from "@/entity/BasePageListEntity";
import { LogicResult } from "@/enum/http";
import Logger from "@/utils/Logger";
import { Request as ExpressRequest } from "express";
import { Controller } from "tsoa";

/**
 * 基础控制器类
*/
export class BaseController extends Controller{

	/**
	 * 记录响应信息到日志中
	*/
	private logResponse<T>(data: BaseObjectEntity<T>) {
		Logger.info('[Response Data]')
		Logger.info(JSON.stringify(data))
	}

	protected successResponse<T>(req: ExpressRequest, data: T, message: string = ''): BaseObjectEntity<T> {
		const result =  {
			status: LogicResult.SUCCESS,
			message,
			data
		}
		this.logResponse(result)
		return result
	}

	protected successListResponse<T>(req: ExpressRequest, data: PageListType<T>, message: string = ''): BasePageListEntity<T> {
		const result =  {
			status: LogicResult.SUCCESS,
			message,
			data
		}
		this.logResponse(result)
		return result
	}

	protected failedResponse<T>(req: ExpressRequest, message: string = '', data?: T): BaseObjectEntity<T> {
		const result =  {
			status: LogicResult.FAILED,
			message,
			data
		}
		this.logResponse(result)
		return result
	}

}