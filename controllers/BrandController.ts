import { Get, Route, Tags, Request, Body, Queries, Put, Post, Path, Delete } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { PageDTO } from "@/dto/PageDTO";
import { BrandModel } from "@/models/BrandModel";
import { BasePageListEntity } from "@/entity/BasePageListEntity";
import { BrandDTO } from "@/dto/BrandDTO";
import { BaseObjectEntity } from "@/entity/BaseObjectEntity";

@Route('brand')
@Tags('品牌模块')
export class BrandController extends BaseController {

	/**
	 * 获取品牌列表
	*/
	@Get('list')
	public async getBrandList(@Request() req: ExpressRequest, @Queries() query: PageDTO): Promise<BasePageListEntity<BrandDTO>> {
		let { keyword, pageIndex = 1, pageSize = 20 } = query;
		pageIndex = pageIndex as number - 1;
		pageSize = Number(pageSize)
		let searchList = [];
		let total = 0;
		if (keyword) {
			const regex = new RegExp(keyword as string, 'i');
			total = await BrandModel.countDocuments({ name: { $regex: regex } });
			searchList = await BrandModel.find({ name: { $regex: regex } }).skip(pageIndex * Number(pageSize)).limit(Number(pageSize));
		} else {
			total = await BrandModel.estimatedDocumentCount();
			searchList = await BrandModel.find().skip(pageIndex * pageSize).limit(pageSize);
		}
		const pages = Math.ceil(total / pageSize);
		return this.successListResponse(req, {
			list: searchList,
			total: total,
			pageSize: Number(pageSize),
			pageIndex: pageIndex + 1,
			pages: pages
		})
	}

	/**
	 * 新增一品牌
	*/
	@Put()
	public async addABrand(@Request() req: ExpressRequest, @Body() params: BrandDTO): Promise<BaseObjectEntity<BrandDTO>> {
		const { name } = params;
		if (name) {
			const findABrand = await BrandModel.findOne({ name });
			if (findABrand) {
				return this.failedResponse(req, `品牌名：(${name})已存在，请勿重复创建`)
			} else {
				const createABrand = await BrandModel.create({ name });
				return this.successResponse(req, createABrand)
			}
		} else {
			return this.failedResponse(req, '请输入品牌名称')
		}
	}

	/**
	 * 编辑一品牌
	*/
	@Post('{id}')
	public async editABrand(@Request() req: ExpressRequest, @Path() id: string, @Body() params: BrandDTO): Promise<BaseObjectEntity<BrandDTO | null>> {
		const { name } = params;
		if (name) {
			const updateABrand = await BrandModel.findByIdAndUpdate(id, { $set: { name } });
			return this.successResponse(req, updateABrand)
		} else {
			return this.failedResponse(req, '请输入品牌名称')
		}
	}

	@Delete('{id}')
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