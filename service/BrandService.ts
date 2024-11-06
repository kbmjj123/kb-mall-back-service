import { BrandDTO } from "../dto/BrandDTO";
import { BaseService } from "./base/BaseService";
import { BrandModel } from "../models/BrandModel";

/**
 * 品牌的db操作服务
 */
export class BrandService extends BaseService<BrandDTO> {
	constructor() {
		super(BrandModel)
	}
}