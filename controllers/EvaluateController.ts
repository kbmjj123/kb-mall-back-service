import { Body, Get, Put, Queries, Request, Route, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { EvaluateDto, EvaludateListParams, PublishEvaluteParams } from "../dto/EvaluateDTO";
import { BasePageListEntity } from "../entity/BasePageListEntity";
import { EvaluateService } from "../service/EvaluateService";
import { BaseObjectEntity } from "../entity/BaseObjectEntity";
import { ProductService } from "../service/ProductService";
import mongoose from "mongoose";
import { ProductCode } from "../enum/code/ProductCode";

@Route('evaluate')
@Tags('商品评价模块')
export class EvaluateController extends BaseController{

	private evaluateService: EvaluateService

	constructor(){
		super()
		this.evaluateService = new EvaluateService()
	}

	/**
	 * 获取商品评价列表
	*/
	@Get('/list')
	public async getEvaluateByProductId(@Request() req: ExpressRequest, @Queries() params: EvaludateListParams): Promise<BasePageListEntity<EvaluateDto>>{
		const listResult = await this.evaluateService.findList({}, req, params)
		return this.successPageListResponse(req, listResult)
	}

	/**
	 * 发布商品评价
	*/
	@Put('/publicEvaludate')
	public async publicEvaludate(@Request() req: ExpressRequest, @Body() params: PublishEvaluteParams): Promise<BaseObjectEntity<boolean>> {
		// 采用缓存两份的方式= 在商品的最近5份评价以及评价列表中都进行存储一份！
		const productService = new ProductService()
		const session = await mongoose.startSession()
		session.startTransaction()
		try{
			// 检索商品是否存在
			const findAProduct = await productService.findById(params.productId, req)
			if(findAProduct){
				// 往评价表中插入一条记录
				const createAEvaluate = await this.evaluateService.create(params, req)
				if(createAEvaluate){
					// 成功插入一条数据后，更新对应的商品文档，追加一条最新的记录
					const result = await productService.findOneAndUpdate(req, { _id: params.productId }, {
						$expr: {
							$gte: [
								{ $size: '$evaluateList' }, 6
							]
						}
					})
					if(result){
						return this.successResponse(req, !!result)
					}else{
						return this.failedResponse(req)
					}
				}else{
					return this.failedResponse(req, req.t('product.evaluateCreateError'), ProductCode.EVALUATE_CREATE_ERROR)
				}
			}else{
				return this.failedResponse(req, req.t('product.noExist'), ProductCode.PRODUCT_NO_EXIST)
			}
		}catch(error){
			session.abortTransaction()
			throw new Error(`数据库publicEvaludate操作异常`)
		}finally{
			session.endSession()
		}
	}

}