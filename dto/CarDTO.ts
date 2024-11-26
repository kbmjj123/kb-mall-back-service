import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";
import mongoose from "mongoose";

/**
 * 购物车DTO
*/
export interface CarDTO extends ISoftDeleteDTO{
	/**
	 * 购物车id
	*/
	carId: mongoose.Types.ObjectId,

}

/**
 * 加入购车的参数
*/
export type AddToCarParams = Pick<CarDTO, 'carId'> & {
	/**
	 * 添加的数量
	*/
	quantity: number
}