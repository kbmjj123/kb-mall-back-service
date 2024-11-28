import mongoose from "mongoose";
import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";
import { WishlistType } from "../enum/business";
import { ProductDTO } from "./ProductDTO";

/**
 * 愿望清单实体类
*/
export interface WishlistDTO extends ISoftDeleteDTO {

	/**
	 * 用户id
	*/
	userId: mongoose.Types.ObjectId | undefined,
	/**
	 * 清单名称
	*/
	name: string,
	/**
	 * 清单描述信息
	*/
	description?: string,
	/**
	 * 清单类型
	*/
	type: WishlistType,
	/**
	 * 分享的链接地址
	*/
	shareLink?: string,
	/**
	 * 清单中的商品列表
	*/
	items: Array<WishlistItemDTO>
}
/**
 * 生成的分享清单信息
*/
export type SharedWishListDTO = Pick<WishlistDTO, 'type' | 'shareLink'>

/**
 * 待添加到我的愿望清单的商品信息
*/
export type WishlistItemDTO = Pick<ProductDTO, 'id' | 'productName' | 'price' | 'masterPicture' | 'slug'>

/**
 * 添加商品到我的愿望清单所需参数
*/
export type AddItemsParamsDTO = WishlistItemDTO & {
	/**
	 * 待添加到的目标清单id
	*/
	wishlistId: string
}
/**
 * 从愿望清单中移除所需参数
*/
export type RemoteItemParamsDTO = {
	id: string,
	productId: string
}