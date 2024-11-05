import { FilterQuery } from "mongoose";
import { CateDTO } from "../dto/CateDTO";
import { CateModel } from "../models/CateModel";
import { BaseService } from "./base/BaseService";
import { Request as ExpressRequest } from 'express'

export class CateService extends BaseService<CateDTO> {
	constructor(){
		super(CateModel)
	}

	/**
	 * 根据查询条件来获取列表
	 * @param query: 查询条件
	 * @param req 接口请求
	*/
	findListWithQuery(query: FilterQuery<CateDTO> | undefined, req: ExpressRequest): Promise<any> {
		if(query){
			return this.getModel().find(query).setOptions(this.getLanguageOptions(req, {})).limit(0)
		}else{
			return this.findAll(req)
		}
	}
}