import { FilterQuery } from "mongoose";
import { WishlistDTO } from "../dto/WishlistDTO";
import { WishlistModel } from "../models/WishlistModel";
import { BaseService } from "./base/BaseService";

export class WishlistService extends BaseService<WishlistDTO>{
	constructor(){
		super(WishlistModel)
	}

	/**
	 * 软删除当前用户的所有记录
	*/
	// public softDeleteMany(filter: FilterQuery<WishlistDTO> | undefined): Promise<WishlistDTO[] | null>{
	// 	return WishlistModel.softDeleteMany(filter)
	// }

}