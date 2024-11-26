import { Body, Delete, Get, Middlewares, Patch, Path, Query, Request, Route, Tags } from "tsoa";
import { BaseController } from "../BaseController";
import { checkLogin } from "../../middleware/AuthMiddleware";
import { BasePageListEntity } from "../../entity/BasePageListEntity";
import { CollectionDTO } from "../../dto/CollectionDTO";
import { Request as ExpressRequest } from 'express'
import { BaseObjectEntity } from "../../entity/BaseObjectEntity";

/**
 * 我的收藏模块
*/
@Middlewares([checkLogin])
@Route('/api/collection')
@Tags('我的收藏模块')
export class MallCollectionController extends BaseController{

	/**
	 * 获取我的收藏列表
	 */
	@Get('/list')
	public async getCollectionList(@Request() req: ExpressRequest){
	}

	/**
	 * 将商品加入到我的收藏列表中
	*/
	@Patch('/add')
	public async addToCollection(@Request() req: ExpressRequest, @Body() id: string): Promise<BaseObjectEntity<null>>{
		return this.successResponse(req)
	}

	/**
	 * 将商品从我的收藏列表中移除
	*/
	@Delete('/remove')
	public async removeFromCollection(@Request() req: ExpressRequest, @Body() id: string): Promise<BaseObjectEntity<null>>{
		return this.successResponse(req)
	}

	/**
	 * 查询商品是否在我的收藏中
	*/
	@Get('/inCollection')
	public async checkIfInCollection(@Request() req: ExpressRequest, @Query() productId: string): Promise<BaseObjectEntity<boolean>>{
		return this.successResponse(req, true)
	}

}