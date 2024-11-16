import { Body, Get, Route, Request, Path, Delete, Post, Put, Middlewares, Queries, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { PageDTO } from "../dto/PageDTO";
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { BaseObjectEntity } from "../entity/BaseObjectEntity";
import { CheckSlugParams, EditProductParams, ProductDTO } from "../dto/ProductDTO";
import { BasePageListEntity } from "../entity/BasePageListEntity";
import { body } from 'express-validator'
import ParamsValidateMW from "../middleware/ParamsValidateMW";
import { CateModel } from "../models/CateModel";
import { checkLogin } from "../middleware/AuthMiddleware";
import { ProductService } from "../service/ProductService";
import { ProductCode } from "../enum/code/ProductCode";
import { ResultCode } from "../enum/http";
import { BrandService } from "../service/BrandService";

/**
 * 商品字段自定义校验
*/
const validateProductMW = [
	body('cates').notEmpty().isArray(),
	body('productName', '请维护商品名称').notEmpty().trim().isLength({ max: 60 }),
	body('masterPicture').notEmpty(),
	body('descPictures').notEmpty().isArray({ max: 5 }),
	body('slug').notEmpty().isSlug(),
	body('price').notEmpty().isNumeric(),
	body('activityPrice').isNumeric(),
	// 针对分类属性做是否为合法分类id做校验判断
	body('cates').custom(async (cateArray) => {
		const catePromises = cateArray.map((cateId: string) => {
			return CateModel.findById(cateId);
		})
		// 等待所有分类的查询结果
		const categorys = await Promise.all(catePromises);
		if (categorys.some(category => !category)) {
			//? 存在空分类，则抛出异常
			throw new Error('请上传正确的分类！');
		}
	}),
	ParamsValidateMW
]

@Route('product')
// @Middlewares([checkLogin])
@Tags('产品模块')
export class ProductController extends BaseController {

	/**
	 * 获取商品列表
	*/
	@Get('/list')
	public async getProductList(@Request() req: ExpressRequest, @Queries() query: PageDTO): Promise<BasePageListEntity<ProductDTO>> {
		const productService = new ProductService()
		const listResult = await productService.findListInPage('name', query)
		return this.successPageListResponse(req, listResult)
	}

	/**
	 * 获取一个商品明细信息
	*/
	@Get('/{id}')
	public async getAProduct(@Request() req: ExpressRequest, @Path() id: string): Promise<BaseObjectEntity<ProductDTO>> {
		if (id) {
			const productService = new ProductService()
			const findAProduct = await productService.findById(id, req);
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
	 * 删除一个商品
	*/
	@Delete('/{id}')
	public async removeAProduct(@Request() req: ExpressRequest, @Path() id: string): Promise<BaseObjectEntity<string>> {
		if (id) {
			const productService = new ProductService()
			const deleteAProduct = await productService.sofeDeleteById(id, req)
			if (deleteAProduct) {
				// 删除成功
				return this.successResponse(req, id)
			} else {
				return this.failedResponse(req, req.t('tip.failed'))
			}
		} else {
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 上/下架一款商品
	*/
	@Post('/{id}/upOrDownShelves')
	public async upOrDownAProduct(@Request() req: ExpressRequest, @Path() id: string) {
		const { state } = req.body;
		if (id) {
			if (state) {
				try {
					const productService = new ProductService()
					const updateAProduct = await productService.findOneAndUpdate(req, { id }, {
						$set: { state }
					}, { runValidators: true, lauguage: req.language })
					return this.successResponse(req, updateAProduct)
				} catch (err) {
					return this.failedResponse(req)
				}
			}
		} else {
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 检查slug的唯一性
	*/
	@Post('/slug/check')
	public async checkSlugUnique(@Request() req: ExpressRequest, @Body() params: CheckSlugParams): Promise<BaseObjectEntity<Boolean>> {
		const { slug } = params
		if(slug){
			const productService = new ProductService()
			const findAProduct = await productService.findOne({ slug }, req)
			if(!findAProduct){
				return this.successResponse(req, true, req.t('product.slugCanUse', {slug}))
			}else{
				return this.failedResponse(req, req.t('product.slugExist'), ProductCode.SLUG_ALREADY_EXIST)
			}
		}else{
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

	/**
	 * 发布一个商品
	*/
	@Put('/publish')
	@Middlewares(validateProductMW)
	public async createProduct(@Request() req: ExpressRequest, @Body() params: EditProductParams): Promise<BaseObjectEntity<ProductDTO>> {
		try {
			// 默认初始化商品相关属性
			params['sales'] = 0;
			params['score'] = 0;
			params['state'] = 'online';
			const { brandId } = params;
			if (brandId) {
				const brandService = new BrandService()
				const findABrand = await brandService.findById(brandId, req)
				if (findABrand) {
					//? 有效的品牌信息
					const productService = new ProductService()
					const createAProduct = await productService.create(params, req)
					if (createAProduct) {
						return this.successResponse(req, createAProduct)
					} else {
						return this.failedResponse(req, '创建失败，请检查参数后重试！')
					}
				}
			}
		} catch (error) {
			console.info(error);
			return this.failedResponse(req, '创建失败，请检查参数后重试！')
		}
		return this.failedResponse(req, '创建失败，请检查参数后重试！')
	}

	/**
	 * 编辑商品
	*/
	@Post('/{id}')
	@Middlewares(validateProductMW)
	public async editProduct(@Request() req: ExpressRequest, @Path() id: string, @Body() params: any): Promise<BaseObjectEntity<ProductDTO | null>> {
		if (id) {
			const productService = new ProductService()
			const updateAProduct = await productService.findOneAndUpdate(req, { id }, params, { runValidators: true })
			return this.successResponse(req, updateAProduct)
		} else {
			return this.failedResponse(req, req.t('tip.paramsError'), ResultCode.PARAMS_ERROR)
		}
	}

}