import { Body, Delete, Get, Middlewares, Patch, Path, Post, Put, Queries, Query, Request, Route, Tags } from "tsoa";
import { BaseController } from "../BaseController";
import { Request as ExpressRequest } from "express";
import { BaseObjectEntity } from "../../entity/BaseObjectEntity";
import { AddItemsParamsDTO, RemoteItemParamsDTO, SharedWishListDTO, WishlistDTO, WishlistItemDTO } from "../../dto/WishlistDTO";
import { WishlistService } from "../../service/WishlistService";
import { WishlistCode } from "../../enum/code/WishlistCode";
import { ResultCode } from "../../enum/http";
import { PageDTO } from "../../dto/PageDTO";
import { checkLogin } from "../../middleware/AuthMiddleware";
import { BasePageListEntity } from "../../entity/BasePageListEntity";
import { WishlistType } from "../../enum/business";
import TokenGenerator from "../../config/TokenGenerator";

@Route('/api/wishlist')
@Tags('愿望清单模块')
export class MallWishListController extends BaseController {

	/**
	 * 将个人的愿望清单调整为对外分享的愿望清单
	*/
	@Patch('/share')
	@Middlewares([checkLogin])
	public async generateShareWishlist(@Request() req: ExpressRequest, @Query() id: string): Promise<BaseObjectEntity<SharedWishListDTO>> {
		if (id) {
			const { id: userId } = req.user
			const wishlistService = new WishlistService()
			const findAWishlist = await wishlistService.findOne({ id }, req)
			if (findAWishlist) {
				findAWishlist.type = WishlistType.SHARE
				// 生成分享的链接
				const token = TokenGenerator.generateShareWishlistToken(id)
				if (token) {
					findAWishlist.shareLink = `${process.env.SHARE_WISHLIST_LINK}?token=${token}`
					const modifyAWishlist = await wishlistService.update(id, findAWishlist, req)
					if (modifyAWishlist) {
						return this.successResponse(req, {
							id,
							shareLink: modifyAWishlist.shareLink!,
							type: modifyAWishlist.type
						})
					} else {
						return this.failedResponse(req)
					}
				} else {
					return this.failedResponse(req)
				}
			} else {
				return this.failedResponse(req, req.t('wishlist.noExist'), WishlistCode.WISHLIST_NO_EXIST)
			}
		} else {
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 根据生成的分享token获取对应的愿望清单信息
	*/
	@Get('/info/${token}')
	public async getWishlistInfoById(@Request() req: ExpressRequest, @Path() token: string): Promise<BaseObjectEntity<WishlistDTO>> {
		if (token) {
			const wishlistService = new WishlistService()
			const wishlistId = TokenGenerator.validateWishlistToken(token)
			if (wishlistId) {
				const findAWishlist = await wishlistService.findById(wishlistId, req)
				if (findAWishlist) {
					return this.successResponse(req, findAWishlist)
				} else {
					return this.failedResponse(req, req.t('wishlist.noExist'), WishlistCode.WISHLIST_NO_EXIST)
				}
			} else {
				return this.failedResponse(req)
			}
		} else {
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 获取我的愿望清单列表
	*/
	@Get('/personal')
	@Middlewares([checkLogin])
	public async getMyWishlist(@Request() req: ExpressRequest, @Queries() params: PageDTO): Promise<BasePageListEntity<WishlistDTO>> {
		const { id } = req.user
		const wishlistService = new WishlistService()
		const result = await wishlistService.findList({ userId: id }, req, params)
		return this.successPageListResponse(req, result)
	}

	/**
	 * 创建一愿望清单
	*/
	@Put('/create')
	@Middlewares([checkLogin])
	public async createWishlist(@Request() req: ExpressRequest, @Body() params: WishlistDTO) {
		const { id } = req.user
		const wishlistService = new WishlistService()
		const createAWishlist = await wishlistService.create({
			...params,
			userId: id
		}, req)
		if (createAWishlist) {
			return this.successResponse(req, createAWishlist)
		} else {
			return this.failedResponse(req)
		}
	}

	/**
	 * 删除一愿望清单
	*/
	@Put('/delete')
	@Middlewares([checkLogin])
	public async removeWishlist(@Request() req: ExpressRequest, @Query() id: string) {
		const wishlistService = new WishlistService()
		const findDeleteWishlist = await wishlistService.findOne({ id }, req)
		if (findDeleteWishlist) {
			const deleteAWishlist = await wishlistService.sofeDeleteById(id, req)
			if (deleteAWishlist) {
				return this.successResponse(req, true)
			} else {
				return this.failedResponse(req)
			}
		} else {
			return this.failedResponse(req, req.t('wishlist.noExist'), ResultCode.NO_FOUND)
		}
	}

	/**
	 * 添加商品到我的愿望清单中
	*/
	@Put('/addItems')
	@Middlewares([checkLogin])
	public async addItemsToWishlist(@Request() req: ExpressRequest, @Body() params: AddItemsParamsDTO): Promise<BaseObjectEntity<WishlistDTO>> {
		// 获取传递过来的商品信息以及待添加的目标愿望清单id
		const { wishlistId } = params
		const { id, productName, price, slug, masterPicture } = params
		const wishlistService = new WishlistService()
		const updateAWishlist = await wishlistService.update(wishlistId, {
			$addToSet: {
				items: {
					id, productName, price, slug, masterPicture
				}
			}
		}, req)
		if (updateAWishlist) {
			return this.successResponse(req, updateAWishlist)
		} else {
			return this.failedResponse(req)
		}
	}

	/**
	 * 将商品从我的愿望清单中移除
	*/
	@Delete('/removeItems')
	@Middlewares([checkLogin])
	public async removeItemsFromWishlist(@Request() req: ExpressRequest, @Body() params: RemoteItemParamsDTO) {
		const { id, productId } = params
		if(id && productId){
			const wishlistService = new WishlistService()
			const removeAItem = await wishlistService.update(id, {
				$pull: {
					items: {
						id: productId
					}
				}
			}, req)
			if(removeAItem){
				return this.successResponse(req, removeAItem)
			}else{
				return this.failedResponse(req)
			}
		}else{
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 清空我的愿望清单
	*/
	@Post('/clean')
	@Middlewares([checkLogin])
	public async cleanWishlist(@Request() req: ExpressRequest) {
		// const { id: userId } = req.user
		// const wishlistService = new WishlistService()
		// const userWishlist = await wishlistService.findAll({ userId }, req)
		// if (userWishlist && userWishlist.length > 0) {
		// 	const deleteArray = await wishlistService.softDeleteMany({ userId })
		// 	if (deleteArray && deleteArray.length > 0) {
		// 		return this.successResponse(req, true)
		// 	}
		// } else {
		// 	return this.failedResponse(req, req.t('wishlist.noValidate'), WishlistCode.WISHLIST_NO_VALIDATE)
		// }
	}

	/**
	 * 检查某一商品是否在我的愿望清单中
	*/
	@Get('/isInWishlist')
	@Middlewares([checkLogin])
	public async isItemInWishlist(@Request() req: ExpressRequest, @Query() id: string) {
		const { id: userId } = req.user
		const wishlistService = new WishlistService()

	}

}