import { Body, Delete, Get, Middlewares, Path, Post, Put, Request, Route, Tags } from "tsoa";
import { Request as ExpressRequest } from 'express'
import { BaseController } from "./BaseController";
import { CateModel } from "../models/CateModel";
import { BaseObjectEntity } from "../entity/BaseObjectEntity";
import { CateDTO, EditCateDTO } from "../dto/CateDTO";
import { CateService } from "../service/CateService";
import { ProductCode } from "../enum/code/ProductCode";
import { ResultCode } from "../enum/http";
import { checkLogin } from "../middleware/AuthMiddleware";

@Route('cate')
@Tags('分类模块')
@Middlewares([checkLogin])
export class CateController extends BaseController {

	@Get('list')
	public async getCateList(@Request() req: ExpressRequest): Promise<BaseObjectEntity<Array<CateDTO>>> {
		//? 获取一级列表-->由于有异步嵌套，采用将一个异步查询转换为等待执行的promise
		const cateService = new CateService()
		const cateList1 = await cateService.findListWithQuery({ level: 0 }, req)
		const cateListPromises = cateList1.map(async (cate1: any) => {
			const cateList2 = await cateService.findListWithQuery({ parentId: cate1.id }, req)
			const childCateListPromise = cateList2.map(async (cate2: any) => {
				const cateList3 = await cateService.findListWithQuery({ parentId: cate2.id }, req)
				return {
					...cate2.toObject(),
					children: cateList3
				}
			});
			const children = await Promise.all(childCateListPromise);
			return {
				...cate1.toObject(),
				children: children
			}
		});
		const finalCateList = await Promise.all(cateListPromises);
		return this.successResponse(req, finalCateList)
	}

	@Put('/')
	public async addACate(@Request() req: ExpressRequest, @Body() params: EditCateDTO): Promise<BaseObjectEntity<CateDTO>> {
		const { title } = params;
		if (title) {
			const cateService = new CateService()
			const findACate = await cateService.findOne({ title }, req)
			if (findACate) {
				return this.failedResponse(req, req.t('cate.noExist', { title }), ProductCode.CATE_NO_EXIST)
			} else {
				const createACate = await cateService.create(params, req)
				return this.successResponse(req, createACate)
			}
		} else {
			return this.failedResponse(req, req.t('cate.inputTip'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 编辑一分类信息
	*/
	@Post('/{id}')
	public async editACate(@Request() req: ExpressRequest, @Path() id: string, @Body() params: CateDTO): Promise<BaseObjectEntity<CateDTO | null>> {
		const { title } = params;
		if (id) {
			if (title) {
				const updateACate = await CateModel.findByIdAndUpdate(id);
				return this.successResponse(req, updateACate);
			} else {
				return this.failedResponse(req, '请维护待编辑的分类标题')
			}
		} else {
			return this.failedResponse(req, '请维护待编辑的分类id')
		}
	}

	/**
	 * 删除一分类信息
	*/
	@Delete('/{id}')
	public async removeACate(@Request() req: ExpressRequest, @Path() id: string) {
		if (id) {
			const cateService = new CateService()
			const result = await cateService.sofeDeleteById(id, req)
			if (result) {
				return this.successResponse(req, result.id)
			} else {
				return this.failedResponse(req, '操作失败')
			}
		} else {
			return this.failedResponse(req, '请传递分类id')
		}
	}

}