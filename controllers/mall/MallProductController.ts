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
	 * 获取整颗分类数
	*/
	@Get('/allCate')
	public async getCateList(@Request() req: ExpressRequest): Promise<BaseObjectEntity<Array<CateDTO>>> {
		//? 获取一级列表-->由于有异步嵌套，采用将一个异步查询转换为等待执行的promise
		const cateService = new CateService()
		const cateList1 = await cateService.findAll({ level: 0 }, req)
		const cateListPromises = cateList1.map(async (cate1: any) => {
			const cateList2 = await cateService.findAll({ parentId: cate1.id }, req)
			const childCateListPromise = cateList2.map(async (cate2: any) => {
				const cateList3 = await cateService.findAll({ parentId: cate2.id }, req)
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

	/**
	 * 获取商品列表
	*/
	@Get('/list')
	public async getProductList(@Request() req: ExpressRequest, @Queries() query: PageDTO) {
		const productService = new ProductService()
		const listResult = await productService.findListInPage('name', query)
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