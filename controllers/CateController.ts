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

	@Get('/list')
	public async getCateList(@Request() req: ExpressRequest): Promise<BaseObjectEntity<Array<CateDTO>>> {
		const cateService = new CateService()
		const allCateList = (await cateService.findAll({}, req))
		const firstCateList = allCateList.filter(item => item.level === 0)
		const finalCateList = firstCateList.map(cate1 => {
			return {
				...cate1,
				children: allCateList.filter(item2 => item2.parentId === cate1.id).map(cate2 => {
					return {
						...cate2,
						children: allCateList.filter(item3 => item3.parentId === cate2.id)
					}
				})
			}
		})
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