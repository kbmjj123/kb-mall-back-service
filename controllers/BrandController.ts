import { Get, Route, Tags, Request, Body, Queries, Put, Post, Path, Delete } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { PageDTO } from "../dto/PageDTO";
import { BrandModel } from "../models/BrandModel";
import { BasePageListEntity } from "../entity/BasePageListEntity";
import { BrandDTO, EditBrandDTO, SingleBrandDTO } from "../dto/BrandDTO";
import { BaseObjectEntity } from "../entity/BaseObjectEntity";
import { BrandService } from "../service/BrandService";
import { ProductCode } from "../enum/code/ProductCode";
import { ResultCode } from "../enum/http";

@Route('brand')
@Tags('品牌模块')
export class BrandController extends BaseController {

	@Get('/allList')
	public async getAllBandList(@Request() req: ExpressRequest): Promise<BaseObjectEntity<Array<SingleBrandDTO>>> {
		const brandService = new BrandService(req)
		const result = await brandService.findAll(req)
		return this.successResponse(req, result)
	}

	/**
	 * 获取品牌列表
	*/
	@Get('/list')
	public async getBrandList(@Request() req: ExpressRequest, @Queries() query: PageDTO): Promise<BasePageListEntity<BrandDTO>> {
		const brandService = new BrandService(req)
		const result = await brandService.findListInPage('name', query)
		return this.successListResponse(req, result)
	}

	/**
	 * 新增一品牌
	*/
	@Put('/')
	public async addABrand(@Request() req: ExpressRequest, @Body() params: EditBrandDTO): Promise<BaseObjectEntity<BrandDTO>> {
		const { name, icon, languageList, language } = params;
		if (name) {
			const brandService = new BrandService(req)
			const findABrand = await brandService.isExist({ name }, req);
			if (findABrand) {
				return this.failedResponse(req, req.t('brand.exist', { name }), ProductCode.BRAND_ALREADY_EXIST)
			} else {
				const createABrand = await brandService.create({ name, icon, languageList, language }, req);
				return this.successResponse(req, createABrand)
			}
		} else {
			return this.failedResponse(req, req.t('brand.inputTip'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 编辑一品牌
	*/
	@Post('/{id}')
	public async editABrand(@Request() req: ExpressRequest, @Path() id: string, @Body() params: BrandDTO): Promise<BaseObjectEntity<BrandDTO | null>> {
		const { name } = params;
		if (name) {
			const updateABrand = await BrandModel.findByIdAndUpdate(id, { $set: { name } });
			return this.successResponse(req, updateABrand)
		} else {
			return this.failedResponse(req, req.t('brand.inputTip'))
		}
	}

	/**
	 * 删除品牌
	*/
	@Delete('/{id}')
	public async removeABrand(@Request() req: ExpressRequest, @Path() id: string): Promise<BaseObjectEntity<string>> {
		if (id) {
			const result = await BrandModel.findByIdAndDelete(id);
			if (result && result._id) {
				return this.successResponse(req, result._id as unknown as string)
			} else {
				return this.failedResponse(req, '操作失败')
			}
		} else {
			return this.failedResponse(req, '请传递品牌id')
		}
	}

}