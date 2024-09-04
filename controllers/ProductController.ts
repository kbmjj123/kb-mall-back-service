import { Body, Get, Route, Request, Path, Delete, Post, Put, Middlewares, Queries, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { PageDTO } from "@/dto/PageDTO";
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { BaseObjectEntity } from "@/entity/BaseObjectEntity";
import { ProductDTO } from "@/dto/ProductDTO";
import { ProductModel } from "@/models/ProductModel";
import { BasePageListEntity } from "@/entity/BasePageListEntity";
import { ObjectId } from "mongodb";
import { body } from 'express-validator'
import ParamsValidateMW from "@/middleware/ParamsValidateMW";
import { CateModel } from "@/models/CateModel";
import { BrandModel } from "@/models/BrandModel";

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
    if(categorys.some(category => !category)){
      //? 存在空分类，则抛出异常
      throw new Error('请上传正确的分类！');
    }
  }),
	ParamsValidateMW
]

@Route('product')
@Tags('产品模块')
export class ProductController extends BaseController {

	/**
	 * 获取商品列表
	*/
	@Get('list')
	public async getProductList(@Request() req: ExpressRequest, @Queries() query: PageDTO): Promise<BasePageListEntity<ProductDTO>> {
		let { keyword, pageIndex, pageSize } = query;
		pageIndex -= 1;
		let searchList = [], total = 0;
		if (keyword) {
			const regex = new RegExp(keyword, 'i');
			searchList = await ProductModel.find({ name: { $regex: regex } }).skip(pageIndex * pageSize).limit(pageSize);
			total = await ProductModel.countDocuments({ name: { $regex: regex } });
		} else {
			searchList = await ProductModel.find().skip(pageIndex * pageSize).limit(pageSize);
			total = await ProductModel.estimatedDocumentCount();
		}
		const pages = Math.ceil(total / pageSize);
		return this.successListResponse(req, {
			list: searchList,
			total,
			pageSize: Number(pageSize),
			pageIndex: Number(pageIndex + 1),
			pages
		})
	}

	/**
	 * 获取一个商品明细信息
	*/
	@Get('{id}')
	public async getAProduct(@Request() req: ExpressRequest, @Path() id: string): Promise<BaseObjectEntity<ProductDTO>> {
		if (id) {
			const findAProduct = await ProductModel.findOne({ _id: new ObjectId(id) }).setOptions({language: req.language});
			if (findAProduct) {
				return this.successResponse(req, findAProduct)
			} else {
				return this.failedResponse(req, 'id错误，请检查后重试')
			}
		} else {
			return this.failedResponse(req, '请传递需要查询的商品id')
		}
	}

	/**
	 * 删除一个商品
	*/
	@Delete('{id}')
	public async removeAProduct(@Request() req: ExpressRequest, @Path() id: string): Promise<BaseObjectEntity<string>> {
		if (id) {
			const deleteAProduct = await ProductModel.deleteOne({ _id: new ObjectId(id) });
			if (1 === deleteAProduct.deletedCount) {
				// 删除成功
				return this.successResponse(req, id)
			} else {
				return this.failedResponse(req, '操作失败，请稍后重试', id)
			}
		} else {
			return this.failedResponse(req, '请传递需要删除的商品id')
		}
	}

	/**
	 * 上/下架一款商品
	*/
	@Post('{id}/onOrOff')
	public async upOrDownAProduct(@Request() req: ExpressRequest, @Path() id: string) {
		const { state } = req.body;
		if (id) {
			if (state) {
				try {
					const updateAProduct = await ProductModel.findByIdAndUpdate(id, {
						$set: { state }
					}, { runValidators: true, lauguage: req.language })
					return this.successResponse(req, updateAProduct)
				} catch (err) {
					return this.failedResponse(req, '操作失败')
				}
			}
		} else {
			return this.failedResponse(req, '请传递需要修改的商品id')
		}
	}

	/**
	 * 发布一个商品
	*/
	@Put('publish')
	@Middlewares(validateProductMW)
	public async createProduct(@Request() req: ExpressRequest, @Body() params: any): Promise<BaseObjectEntity<string>> {
		try {
			// 默认初始化商品相关属性
			params['sales'] = 0;
			params['score'] = 0;
			params['state'] = 'online';
			const createAProductModel = new ProductModel(params);
			createAProductModel.setLanguage(req.language)
			const err = createAProductModel.validateSync();
			if (err) {
				//? 参数异常，将异常信息返回给客户端
				return this.failedResponse(req, err.errors.message.value)
			} else {
				// 参数正常，检测相关的必要属性后，再触发创建动作
				const { brandId, cates } = params;
				if (brandId) {
					const findABrand = await BrandModel.findById(brandId);
					if (findABrand) {
						//? 有效的品牌信息
						const createResult = await createAProductModel.save();
						if (createResult) {
							return this.successResponse(req, createResult._id as unknown as string)
						} else {
							return this.failedResponse(req, '创建失败，请检查参数后重试！')
						}
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
	@Post('{id}')
	@Middlewares(validateProductMW)
	public async editProduct(@Request() req: ExpressRequest, @Path() id: string, @Body() params: any): Promise<BaseObjectEntity<ProductDTO | null>> {
		if (id) {
			const updateAProduct = await ProductModel.findByIdAndUpdate(id, params, { runValidators: true });
			console.info(updateAProduct);
			return this.successResponse(req, updateAProduct)
		} else {
			return this.failedResponse(req, '请传递需要修改的商品id')
		}
	}

}