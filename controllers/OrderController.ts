import { Body, Get, Path, Put, Queries, Query, Request, Route, Tags } from "tsoa";
import { Request as ExpressRequest } from 'express'
import { BaseController } from "./BaseController";
import { PageDTO } from "../dto/PageDTO";
// import { OrderService } from "../service/OrderService";
import { BasePageListEntity } from "../entity/BasePageListEntity";
import { OrderDTO } from "../dto/OrderDTO";
import { BaseObjectEntity } from "../entity/BaseObjectEntity";
import { ResultCode } from "../enum/http";

@Route('order')
@Tags('订单模块')
export class OrderController extends BaseController{

	/**
	 * 获取订单列表功能
	*/
	// @Get('/list')
	// public async getOrderList(@Request() req: ExpressRequest, @Queries() query: PageDTO): Promise<BasePageListEntity<OrderDTO>>{
	// 	const orderService = new OrderService()
	// 	const listResult = await orderService.findListInPage('name', query)
	// 	return this.successListResponse(req, listResult)
	// }

	/**
	 * 获取订单详情
	*/
	// @Get('/{id}')
	// public async getOrderDetail(@Request() req: ExpressRequest, @Path() id: string): Promise<BaseObjectEntity<OrderDTO>> {
	// 	if(id){
	// 		const orderService = new OrderService()
	// 		const findAOrder = await orderService.findById(id, req)
	// 		if(findAOrder){
	// 			return this.successResponse(req, findAOrder)
	// 		}else{
	// 			return this.failedResponse(req)
	// 		}
	// 	}else{
	// 		return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
	// 	}
	// }

}