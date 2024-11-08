import { Body, Get, Put, Queries, Request, Route, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { PageDTO } from "../dto/PageDTO";
import { EvaluateDto } from "../dto/EvaluateDTO";
import { BasePageListEntity } from "../entity/BasePageListEntity";
import { EvaluateService } from "../service/EvaluateService";

@Route('evaluate')
@Tags('商品评价模块')
export class EvaluateController extends BaseController{

	/**
	 * 获取商品评价列表
	*/
	@Get('list')
	public async getEvaluateByProductId(@Request() req: ExpressRequest, @Queries() params: PageDTO): Promise<BasePageListEntity<EvaluateDto>>{
		const evaludateService = new EvaluateService()
		const listResult = await evaludateService.findListInPage('', params)
		return this.successPageListResponse(req, listResult)
	}

}