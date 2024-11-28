import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";
import mongoose from "mongoose";
/**
 * 收藏DTO
*/
export interface CollectionDTO extends ISoftDeleteDTO{
	/**
	 * 用户唯一id
	*/
	userId: mongoose.Types.ObjectId | undefined,
	/**
	 * 商品id
	*/
	productId: mongoose.Types.ObjectId | string | undefined,
}