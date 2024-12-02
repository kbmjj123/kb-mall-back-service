import { FilterQuery } from "mongoose";
import { CarDTO } from "../dto/CarDTO";
import { ShoppingCarModel } from "../models/ShoppingCarModel";
import { BaseService } from "./base/BaseService";
import { PopulateOptionType } from "./base/IService";
import { Request as ExpressRequest } from 'express'
import { errorLogger } from "../utils/Logger";
import { CarItemState } from "../enum/business";

export class ShoppingCarService extends BaseService<CarDTO>{
	constructor(){
		super(ShoppingCarModel)
	}

	/**
	 * 查找出已转换后的购物车文档记录
	*/
	public async findObjectOne(filter: FilterQuery<CarDTO> | undefined, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Promise<CarDTO | null> {
		const query = this.buildQuery(super.getModel().findOne(filter), req, select, populate)
		try{
			const result = await query.exec()
			return super.toDTO(result)
		}catch(error){
			errorLogger.error(`[findObjectOne]异常`)
			errorLogger.error(error)
			throw new Error(`数据库findObjectOne查询异常`)
		}
	}

	/**
	 * 变更用户购物车中某个商品状态-->主要提供给其他的服务使用，像商品服务(上下架)、订单服务(售出则更新库存，当库存不足时更新)
	 * 这里应该是要设计为一个定时任务的方式来执行！
	*/
	public async setItemState(id: string, itemState: CarItemState){
		
	}
}