import { Body, Get, Put, Queries, Request, Route, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { PageDTO } from "@/dto/PageDTO";
import { EvaluateDto } from "@/dto/EvaluateDTO";

@Route('evaluate')
@Tags('商品评价模块')
export class EvaluateController extends BaseController{

	/**
	 * 获取商品评价列表
	*/
	@Get('list')
	public async getEvaluateByProductId(@Request() req: ExpressRequest, @Queries() params: PageDTO){}

	/**
	 * 新增一商品评价
	*/
	@Put()
	public async createAEvaluate(@Request() req: ExpressRequest, @Body() params: EvaluateDto) {}

	

}