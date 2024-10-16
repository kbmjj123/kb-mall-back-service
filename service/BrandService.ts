import { BrandDTO } from "../dto/BrandDTO";
import { BaseService } from "./base/BaseService";
import { Request } from "express";
import { BrandModel } from "../models/BrandModel";

/**
 * 品牌的db操作服务
 */
export class BrandService extends BaseService<BrandDTO> {
	private req: Request
	constructor(req: Request) {
		super(BrandModel)
		this.req = req
	}
}