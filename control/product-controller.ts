import asyncHandler from 'express-async-handler'
import productModel from '../model/product-model'
import brandModel from '../model/brand-model';
import cateModel from '../model/cate-model';
import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { RequestHandler } from 'express';
// 统一的校验处理动作
const commonResultValidateMW = require('../middleware/common-result-validate-middleware');

// 商品参数校验器
const validateProduct = () => [
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
      return cateModel.findById(cateId);
    })
    // 等待所有分类的查询结果
    const categorys = await Promise.all(catePromises);
    if(categorys.some(category => !category)){
      //? 存在空分类，则抛出异常
      throw new Error('请上传正确的分类！');
    }
  }),
  commonResultValidateMW
]

export default {
  // 发布一个商品
  createProduct: [validateProduct, asyncHandler(async (req, res) => {
		const params = req.body;
		try {
			// 默认初始化商品相关属性
			params['sales'] = 0;
			params['score'] = 0;
			params['state'] = 'online';
			const createAProductModel = new productModel(params);
			const err = createAProductModel.validateSync();
			if (err) {
				//? 参数异常，将异常信息返回给客户端
				res.failed(-3, null, err.errors.message.value);
			} else {
				// 参数正常，检测相关的必要属性后，再触发创建动作
				const { brandId, cates } = params;
				if (brandId) {
					const findABrand = await brandModel.findById(brandId);
					if (findABrand) {
						//? 有效的品牌信息
						const createResult = await createAProductModel.save();
						if (createResult) {
							res.success(createResult._id);
						} else {
							res.failed(-2, null, '创建失败，请检查参数后重试！');
						}
					}
				}
			}
		} catch (error) {
			console.info(error);
			res.failed(-1, null, '创建异常，请检查参数后重试～');
		}
	})] as RequestHandler[],
  // 编辑一个商品
  editProduct: [validateProduct, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const params = req.body;
    if(id){
      const updateAProduct = await productModel.findByIdAndUpdate(id, params, {runValidators: true});
      console.info(updateAProduct);
      res.success(updateAProduct);
    }else{
      res.failed(-2, null, '请传递需要修改的商品id');
    }
  })] as RequestHandler[],
  // 上/下架商品
  upOrDownAProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    if(id){
      if(state){
        try{
          const updateAProduct = await productModel.findByIdAndUpdate(id, {
            $set: { state }
          }, {runValidators: true})
          res.success(updateAProduct);
        }catch(err){
          res.failed(-2, err, '操作失败')
        }
      }
    }else{
      res.failed(-2, null, '请传递需要修改的商品id');
    }
  }),
  // 删除一个商品
  removeAProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(id){
      const deleteAProduct = await productModel.deleteOne({ _id: new ObjectId(id) });
      if(1 === deleteAProduct.deletedCount){
        // 删除成功
        res.success(id)
      }else{
        res.failed(-3, id, '操作失败，请稍后重试');
      }
    }else{
      res.failed(-2, null, '请传递需要删除的商品id');
    }
  }),
  // 获取一个商品明细信息
  getAProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(id){
      const findAProduct = await productModel.findOne({_id: new ObjectId(id)});
      if(findAProduct){
        res.success(findAProduct);
      }else{
        res.failed(-2, id, 'id错误，请检查后重试');
      }
    }else{
      res.failed(-2, null, '请传递需要查询的商品id')
    }
  }),
  // 分页获取商品列表信息
  getProductList: asyncHandler(async (req, res) => {
    let { keyword, pageIndex, pageSize } = req.body;
    pageIndex -= 1;
    let searchList = [], total = 0;
    if(keyword){
      const regex = new RegExp(keyword, 'i');
      searchList = await productModel.find({ name: { $regex: regex } }).skip(pageIndex * pageSize).limit(pageSize);
      total = await productModel.countDocuments({name: {$regex: regex}});
    }else{
      searchList = await productModel.find().skip(pageIndex * pageSize).limit(pageSize);
      total = await productModel.estimatedDocumentCount();
    }
    let pages = Math.ceil(total / pageSize);
    res.success({
      list: searchList,
      total,
      pageSize: Number(pageSize),
      pageIndex: Number(pageIndex + 1),
      pages
    })
  })
};