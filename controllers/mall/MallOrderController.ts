import { Body, Get, Middlewares, Path, Post, Put, Request, Route, Tags } from "tsoa";
import { BaseController } from "../BaseController";
import { checkLogin } from "../../middleware/AuthMiddleware";
import { Request as ExpressReqeust } from "express";
import { PageDTO } from "../../dto/PageDTO";

@Route('/api/order')
@Tags('商城/订单模块')
@Middlewares([checkLogin])
export class MallOrderController extends BaseController{
	
	/**
	 * 获取我的订单列表
	*/
	@Get('/list')
	public async getMyOrderList(@Request() req: ExpressReqeust, params: PageDTO) {}

	/**
	 * 根据id获取对应的订单详情
	*/
	@Get('/info/${id}')
	public async getOrderDetail(@Request() req: ExpressReqeust, @Path() id: string){

	}

	/**
	 * 预览待下的订单
	*/
	@Post('/preview')
	public async previewOrder(@Request() req: ExpressReqeust, @Body() params: {}) {}

	/**
	 * 创建订单
	*/
	@Put('/add')
	public async createOrder(@Request() req: ExpressReqeust, @Body() params: {}) {}

	/**
	 * 取消订单
	*/
	@Post('/cancel')
	public async cancelOrder(@Request() req: ExpressReqeust, @Body() params: {}) {}

}