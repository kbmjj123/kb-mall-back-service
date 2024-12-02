import { Body, Delete, Get, Middlewares, Patch, Post, Request, Route, Tags } from "tsoa";
import { BaseController } from "../BaseController";
import { Request as ExpressRequest } from 'express'
import { BaseListEntity } from "../../entity/BaseListEntity";
import { AddToCarParams, CarDTO } from "../../dto/CarDTO";
import { checkLogin } from "../../middleware/AuthMiddleware";
import { ShoppingCarService } from "../../service/ShoppingCarService";
import { BaseObjectEntity } from "../../entity/BaseObjectEntity";
import { ProductService } from "../../service/ProductService";
import { ResultCode } from "../../enum/http";
import { CarItemState, ProductState, WishlistType } from "../../enum/business";
import { ProductCode } from "../../enum/code/ProductCode";
import { convertArrayToObject } from "../../utils/ObjectUtils";
import { WishlistService } from "../../service/WishlistService";
import TokenGenerator from "../../config/TokenGenerator";


@Route('/api/shoppingcar')
@Tags('购物车模块')
@Middlewares([checkLogin])
export class MallShoppingCarController extends BaseController{

	private shoppingCarService: ShoppingCarService
	private productService: ProductService

	constructor() {
		super()
		this.shoppingCarService = new ShoppingCarService()
		this.productService = new ProductService()
	}

	/**
	 * 获取购物车列表
	 */
	@Get('/list')
	public async getShoppingCarList(@Request() req: ExpressRequest): Promise<BaseListEntity<CarDTO>> {
		const { id } = req.user
		const carList = await this.shoppingCarService.findAll({ userId: id }, req)
		return this.successListResponse(req, carList)
	}

	/**
	 * 将商品加入到购物车
	*/
	@Patch('/add')
	public async addToShoppingCar(@Request() req: ExpressRequest, @Body() params: AddToCarParams): Promise<BaseObjectEntity<Boolean>>{
		const { id: userId } = req.user
		const { id: productId, quantity } = params
		const findAProduct = await this.productService.findById(productId, req)
		if(findAProduct){
			if(ProductState.ON_LINE === findAProduct.state){
				const addAProductToCar = await this.shoppingCarService.findOneAndUpdate(req, {
					userId
				}, {
					$addToSet: {
						items: {
							id: productId, 
							productName: findAProduct.productName, 
							masterPicture: findAProduct.masterPicture,
							price: findAProduct.price,
							sales: findAProduct.sales,
							itemState: CarItemState.NORMAL,
							quantity
						}
					}
				})
				if(addAProductToCar){
					return this.successResponse(req, !!addAProductToCar)
				}else{
					return this.failedResponse(req)
				}
			}else{
				return this.failedResponse(req, req.t('product.offState'), ProductCode.PRODUCT_OFF_STATE)
			}
		}else{
			return this.failedResponse(req, req.t('tip.noExistError'), ResultCode.NO_FOUND)
		}
	}

	/**
	 * 同时编辑多个购物车中的商品数量
	*/
	@Post('/modify')
	public async modifyShoppingCar(@Request() req: ExpressRequest, @Body() params: Array<AddToCarParams>): Promise<BaseObjectEntity<CarDTO>>{
		const { id: userId } = req.user
		// 将待操作的数组转换为一对象，可在对比过程减少循环次数
		const waitToOptObj = convertArrayToObject(params, 'id')
		if(waitToOptObj){
			const findACar = await this.shoppingCarService.findObjectOne({ userId }, req)
			if(findACar){
				findACar.items.forEach(item => {
					const updateItem = waitToOptObj[item.id]
					item.quantity = updateItem.quantity
				})
				const { tempTotalPrice, tempTotalQuantity } = findACar.items.reduce((previousRes: { tempTotalPrice: number, tempTotalQuantity: number }, currentItem) => {
					previousRes.tempTotalQuantity += currentItem.quantity
					previousRes.tempTotalQuantity += Number(currentItem.price) * currentItem.quantity
					return previousRes
				}, { tempTotalPrice: 0, tempTotalQuantity: 0 })
				findACar.totalPrice = tempTotalPrice
				findACar.totalQuantity = tempTotalQuantity
				const updateACar = await this.shoppingCarService.update(findACar.id, findACar, req)
				if(updateACar){
					return this.successResponse(req, updateACar)
				}else{
					return this.failedResponse(req)
				}
			}else{
				// 如果用户并没购物车信息，则创建一新的购物车信息，并返回该购物车空信息对象
				const createACar = await this.shoppingCarService.create({
					userId, items: [], totalQuantity: 0, totalPrice: 0
				}, req)
				return this.successResponse(req, createACar)
			}
		}else{
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 将商品从购物车中移出
	*/
	@Delete('/remove')
	public async removeFromShoppingCar(@Request() req: ExpressRequest, @Body() params: string[]): Promise<BaseObjectEntity<CarDTO>>{
		const { id: userId } = req.user
		const removeResult = await this.shoppingCarService.findOneAndUpdate(req, { userId }, { $pull: {
			items: {
				id: { $in: params }
			}
		} })
		if(removeResult){
			return this.successResponse(req, removeResult)
		}else{
			return this.failedResponse(req)
		}
	}

	/**
	 * 清空购物车
	*/
	@Post('/clean')
	public async cleanShoppingCar(@Request() req: ExpressRequest): Promise<BaseObjectEntity<boolean>>{
		const { id: userId } = req.user
		const cleanACar = await this.shoppingCarService.findOneAndUpdate(req, { userId }, { $set: { items: [] } })
		if(cleanACar){
			return this.successResponse(req, true)
		}else{
			return this.failedResponse(req)
		}
	}

	/**
	 * 清空失效商品
	*/
	@Delete('/removeLoseEfficacy')
	public async remoteLoseEfficacy(@Request() req: ExpressRequest): Promise<BaseObjectEntity<boolean>>{
		const { id: userId } = req.user
		const clearInvalidateItems = await this.shoppingCarService.findOneAndUpdate(req, { userId }, {
			$pull: {
				items: { itemState: CarItemState.IN_VALIDATE }
			}
		})
		if(clearInvalidateItems){
			return this.successResponse(req, true)
		}else{
			return this.failedResponse(req)
		}
	}

	/**
	 * 分享购物车商品
	*/
	@Post('/share')
	public async shareShoppingCar(@Request() req: ExpressRequest, @Body() params: string[]): Promise<BaseObjectEntity<string>>{
		const productService = new ProductService()
		const findProductList = await productService.findAllObject({
			_id: { $in: params }
		}, req)
		if(findProductList && findProductList.length > 0){
			const { id: userId } = req.user
			const wishlistService = new WishlistService()
			const createAShareCar = await wishlistService.create({
				userId, name: '临时愿望清单名称', type: WishlistType.SHARE, items: findProductList.map(item => ({
					id: item.id,
					productName: item.productName,
					price: item.price,
					masterPicture: item.masterPicture,
					slug: item.slug
				}))
			}, req)
			if(createAShareCar){
				const token = TokenGenerator.generateShareCarToken(createAShareCar.id)
				return this.successResponse(req, `${process.env.SHARE_SHOPPING_CAR_LINK}?token=${token}`)
			}else{
				return this.failedResponse(req)
			}
		}else{
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

}