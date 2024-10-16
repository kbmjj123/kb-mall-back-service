import { Body, Delete, Get, Path, Post, Put, Request, Route, Tags } from "tsoa";
import { Request as ExpressRequest } from 'express'
import { BaseController } from "./BaseController";
import { CateModel } from "../models/CateModel";
import { BaseObjectEntity } from "../entity/BaseObjectEntity";
import { CateDTO } from "../dto/CateDTO";

@Route('cate')
@Tags('分类模块')
export class CateController extends BaseController {

	@Get('list')
	public async getCateList(@Request() req: ExpressRequest): Promise<BaseObjectEntity<Array<CateDTO>>> {
		//? 获取一级列表-->由于有异步嵌套，采用将一个异步查询转换为等待执行的promise
		const cateList1 = await CateModel.find({ level: 0 });
		const cateListPromises = cateList1.map(async (cate1: { _id: any; toObject: () => any; }) => {
			const cateList2 = await CateModel.find({ parentId: cate1._id });
			const childCateListPromise = cateList2.map(async (cate2: { _id: any; toObject: () => any; }) => {
				const cateList3 = await CateModel.find({ parentId: cate2._id });
				return {
					...cate2.toObject(),  //! 这里将对象转换为普通的js对象输出
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

	@Put()
	public async addACate(@Request() req: ExpressRequest, @Body() params: CateDTO): Promise<BaseObjectEntity<CateDTO>> {
		const { title, level = 0, parentId } = params;
		if (title) {
			const findACate = await CateModel.findOne({ title });
			if (findACate) {
				return this.failedResponse(req, `分类名：(${title})已存在，请勿重复创建`)
			} else {
				const createACate = await CateModel.create({
					title,
					level,
					parentId
				});
				return this.successResponse(req, createACate)
			}
		} else {
			return this.failedResponse(req, '请输入分类名称')
		}
	}

	@Post('{id}')
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

	@Delete('{id}')
	public async removeACate(@Request() req: ExpressRequest, @Path() id: string) {
		if (id) {
      const result = await CateModel.findByIdAndDelete(id);
      if (result && result._id) {
				return this.successResponse(req, null)
      } else {
				return this.failedResponse(req, '操作失败')
      }
    } else {
			return this.failedResponse(req, '请传递分类id')
    }
	}

}