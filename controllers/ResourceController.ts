import { Get, Route, Request, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import countries from '@/config/json/CountryCode'
import { BaseObjectEntity } from "@/entity/BaseObjectEntity";
import { CountryDTO } from "@/dto/CountryDTO";

@Route('resource')
@Tags('资源模块')
export class ResourceController extends BaseController {

	/**
	 * 获取全球国家的数据
	*/
	@Get('countries')
	public async getCountries(@Request() req: ExpressRequest): Promise<BaseObjectEntity<Array<CountryDTO>>> {
		return this.successResponse(req, countries)
	}
}