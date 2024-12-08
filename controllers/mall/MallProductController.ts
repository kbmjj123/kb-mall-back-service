import { Get, Route, Tags, Request, Queries, Path } from "tsoa";
import { BaseController } from "../BaseController";
import { SingleBrandDTO } from "../../dto/BrandDTO";
import { BaseObjectEntity } from "../../entity/BaseObjectEntity";
import { BrandService } from "../../service/BrandService";
import { Request as ExpressRequest } from "express";
import { CateService } from "../../service/CateService";
import { CateDTO } from "../../dto/CateDTO";
import { PageDTO } from "../../dto/PageDTO";
import { ProductService } from "../../service/ProductService";
import { ProductCode } from "../../enum/code/ProductCode";
import { ResultCode } from "../../enum/http";
import { ProductDetailDTO, ProductDTO } from "../../dto/ProductDTO";

@Route('/api/product')
@Tags('商城/商品模块')
export class MallProductController extends BaseController{

	/**
	 * 获取所有的品牌列表数据
	*/
	@Get('/allBrand')
	public async getAllBandList(@Request() req: ExpressRequest): Promise<BaseObjectEntity<Array<SingleBrandDTO>>> {
		const brandService = new BrandService()
		const result = await brandService.findAll(null, req)
		return this.successResponse(req, result)
	}

	/**
	 * 获取整颗分类🌲
	*/
	@Get('/allCate')
	public async getCateList(@Request() req: ExpressRequest): Promise<BaseObjectEntity<Array<CateDTO>>> {
		//? 获取一级列表-->由于有异步嵌套，采用将一个异步查询转换为等待执行的promise
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

	/**
	 * 获取商品列表
	*/
	@Get('/list')
	public async getProductList(@Request() req: ExpressRequest, @Queries() query: PageDTO) {
		const productService = new ProductService()
		const listResult = await productService.findList({} ,req,  query)
		return this.successPageListResponse(req, listResult)
	}

	/**
	 * 获取商品详情信息
	*/
	@Get('/{id}')
	public async getProductDetail(@Request() req: ExpressRequest, @Path() id: string) {
		if (id) {
			const productService = new ProductService()
			const findAProduct = await productService.findById(id, req, [], 'cates');
			if (findAProduct) {
				return this.successResponse(req, findAProduct)
			} else {
				return this.failedResponse(req, req.t('product.noExist'), ProductCode.PRODUCT_NO_EXIST)
			}
		} else {
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 通过slug获取商品信息
	*/
	@Get('/slug/{slug}')
	public async getProductDetailBySlug(@Request() req: ExpressRequest, @Path() slug: string): Promise<BaseObjectEntity<ProductDTO>>{
		if(slug){
			const productService = new ProductService()
			const findAProduct = await productService.findOne({slug}, req, [], 'cates')
			if(findAProduct){
				return this.successResponse(req, findAProduct)
			}else{
				return this.failedResponse(req, req.t('product.noExist'), ProductCode.PRODUCT_NO_EXIST)
			}
		}else{
			return this.failedResponse(req, req.t('product.slugNeeded'), ProductCode.PRODUCT_NEED_SLUG)
		}
	}
	
}