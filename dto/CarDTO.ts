import { CarItemState } from "../enum/business";
import { ProductDTO } from "./ProductDTO";
import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";
import mongoose from "mongoose";

/**
 * 购物车中针对用户存储的商品列表item
*/
export type CarItemDTO = Pick<ProductDTO, 'id' | 'productName' | 'masterPicture' | 'price' | 'sales' | 'slug'> & {
	/**
	 * 加入的购物车商品数量
	*/
	quantity: number,
	/**
	 * 加入的商品状态
	*/
	itemState: CarItemState
}
/**
 * 购物车DTO
*/
export interface CarDTO extends ISoftDeleteDTO{
	id: string,
	/**
	 * 用户id
	*/
	userId: string,
	/**
	 * 商品列表
	*/
	items: CarItemDTO[],
	/**
	 * 商品数量汇总
	*/
	totalQuantity: number,
	/**
	 * 商品价格汇总
	*/
	totalPrice: number,
}

/**
 * 加入购车的参数
*/
export type AddToCarParams = Pick<CarItemDTO, 'id'> & {
	/**
	 * 添加的数量
	*/
	quantity: number
}