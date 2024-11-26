import { Body, Delete, Get, Middlewares, Patch, Post, Request, Route, Tags } from "tsoa";
import { BaseController } from "../BaseController";
import { Request as ExpressRequest } from 'express'
import { BaseListEntity } from "../../entity/BaseListEntity";
import { AddToCarParams, CarDTO } from "../../dto/CarDTO";
import { checkLogin } from "../../middleware/AuthMiddleware";
import { ShoppingCarService } from "../../service/ShoppingCarService";
import { BaseObjectEntity } from "../../entity/BaseObjectEntity";


@Route('/api/shoppingcar')
@Tags('购物车模块')
@Middlewares([checkLogin])
export class MallShoppingCarController extends BaseController{

	/**
	 * 获取购物车列表
	 */
	@Get('/list')
	public async getShoppingCarList(@Request() req: ExpressRequest): Promise<BaseListEntity<CarDTO>> {
		const shoppingCarService = new ShoppingCarService()
		const { id } = req.user
		const carList = await shoppingCarService.findAll({ userId: id }, req)
		return this.successListResponse(req, carList)
	}

	/**
	 * 将商品加入到购物车
	*/
	@Patch('/add')
	public async addToShoppingCar(@Request() req: ExpressRequest, @Body() params: AddToCarParams): Promise<BaseObjectEntity<number>>{
		const shoppingCarService = new ShoppingCarService()
		return this.successResponse(req, 0)
	}

	/**
	 * 同时编辑多个购物车中的商品数量
	*/
	@Post('/modify')
	public async modifyShoppingCar(@Request() req: ExpressRequest, @Body() params: Array<AddToCarParams>): Promise<BaseObjectEntity<string>>{
		return this.successResponse(req, '')
	}

	/**
	 * 将商品从购物车中移出
	*/
	@Delete('/remove')
	public async removeFromShoppingCar(@Request() req: ExpressRequest, @Body() params: string[]): Promise<BaseObjectEntity<string>>{
		return this.successResponse(req, '')
	}

	/**
	 * 清空购物车
	*/
	@Post('/clean')
	public async cleanShoppingCar(@Request() req: ExpressRequest): Promise<BaseObjectEntity<boolean>>{
		return this.successResponse(req, true)
	}

	/**
	 * 清空失效商品
	*/
	@Delete('/removeLoseEfficacy')
	public async remoteLoseEfficacy(@Request() req: ExpressRequest): Promise<BaseObjectEntity<boolean>>{
		return this.successResponse(req, true)
	}

	/**
	 * 分享购物车商品
	*/
	@Post('/share')
	public async shareShoppingCar(@Request() req: ExpressRequest, @Body() params: string[]): Promise<BaseObjectEntity<string>>{
		return this.successResponse(req, '')
	}

}