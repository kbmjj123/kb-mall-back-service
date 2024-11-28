import { Body, Delete, Get, Middlewares, Patch, Path, Queries, Query, Request, Route, Tags } from "tsoa";
import { BaseController } from "../BaseController";
import { checkLogin } from "../../middleware/AuthMiddleware";
import { BasePageListEntity } from "../../entity/BasePageListEntity";
import { CollectionDTO } from "../../dto/CollectionDTO";
import { Request as ExpressRequest } from 'express'
import { BaseObjectEntity } from "../../entity/BaseObjectEntity";
import { CollectionService } from "../../service/CollectionService";
import { PageDTO } from "../../dto/PageDTO";
import { ProductCode } from "../../enum/code/ProductCode";
import { ResultCode } from "../../enum/http";

/**
 * 我的收藏模块
*/
@Middlewares([checkLogin])
@Route('/api/collection')
@Tags('我的收藏模块')
export class MallCollectionController extends BaseController {

	/**
	 * 获取我的收藏列表
	 */
	@Get('/list')
	public async getCollectionList(@Request() req: ExpressRequest, @Queries() params: PageDTO): Promise<BasePageListEntity<CollectionDTO>> {
		const { id } = req.user
		const collectionService = new CollectionService()
		const resultList = await collectionService.findList({ userId: id }, req, params, ['createTime'], '')
		return this.successPageListResponse(req, resultList)
	}

	/**
	 * 将商品加入到我的收藏列表中
	*/
	@Patch('/add')
	public async addToCollection(@Request() req: ExpressRequest, @Body() productId: string): Promise<BaseObjectEntity<CollectionDTO>> {
		if(productId){
			const { userId } = req.user
			const collectionService = new CollectionService()
			const createACollection = await collectionService.create({
				userId, productId
			}, req)
			if(createACollection){
				return this.successResponse(req, createACollection)
			}else{
				return this.failedResponse(req, req.t('tip.failed'))
			}
		}else{
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 根据收藏id将商品从我的收藏列表中移除
	*/
	@Delete('/remove')
	public async removeFromCollection(@Request() req: ExpressRequest, @Body() id: string): Promise<BaseObjectEntity<boolean>> {
		if(id){
			const collectionService = new CollectionService()
			const deleteACollection = await collectionService.sofeDeleteById(id, req)
			return this.successResponse(req, !!deleteACollection)
		}else{
			return this.failedResponse(req, req.t('tip.paramsError'))
		}
	}

	/**
	 * 查询商品是否在我的收藏中
	*/
	@Get('/inCollection')
	public async checkIfInCollection(@Request() req: ExpressRequest, @Query() productId: string): Promise<BaseObjectEntity<boolean>> {
		if(productId){
			const collectionService = new CollectionService()
			const findAProductInCollection = await collectionService.findOne({productId}, req)
			return this.successResponse(req, !!findAProductInCollection)
		}else{
			return this.failedResponse(req, req.t('product.invalidateProductId'), ProductCode.PRODUCT_NEED_ID)
		}
	}

}