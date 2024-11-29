import { FilterQuery } from "mongoose";
import { CateDTO } from "../dto/CateDTO";
import { CateModel } from "../models/CateModel";
import { BaseService } from "./base/BaseService";
import { Request as ExpressRequest } from 'express'
import { PopulateOptionType } from "./base/IService";
import { errorLogger } from "../utils/Logger";

export class CateService extends BaseService<CateDTO> {
	constructor(){
		super(CateModel)
	}

	/**
	 * 覆盖的全量查询数据操作，主要针对查询出来的doc进行二次加工
	 * @param filter - 查询的过滤筛选条件
	 * @param req - Express请求对象
	 * @param select - 查询时需要选择的字段
	 * @param populate - 填充选项，使用 Mongoose 的 PopulateOptions 类型
	 * @returns 全量的文档记录
	 */
	async findAll(filter: FilterQuery<CateDTO> | undefined | null, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Promise<CateDTO[]> {
		const query = super.buildQuery(this.getModel().find(filter || {}), req, select, populate)
		try{
			const resultList = await query.exec()
			return resultList.map((item: { toObject: () => any; }) => item.toObject())
		}catch(error){
			errorLogger.error(`[findAll]异常`)
			errorLogger.error(error)
			throw new Error(`数据库findAll查询异常`)
		}
	}

}