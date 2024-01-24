const asyncHandler = require('express-async-handler');
const productModel = require('../model/product-model');
const brandModel = require('../model/brand-model');
const cateModel = require('../model/cate-model');
const { ObjectId } = require('mongodb');

module.exports = {
  // 发布一个商品
  createProduct: asyncHandler(async (req, res) => {
    const params = req.body;
    try{
      // 默认初始化商品相关属性
      params['sales'] = 0;
      params['score'] = 0;
      params['state'] = 'online';
      const createAProductModel = new productModel(params);
      const err = createAProductModel.validateSync();
      if(err){
        //? 参数异常，将异常信息返回给客户端
        res.failed(-3, null, err.errors.message);
      }else{
        // 参数正常，检测相关的必要属性后，再触发创建动作
        const { brandId, cates } = params;
        if(brandId){
          const findABrand = await brandModel.findById(brandId);
          if(findABrand){
            //? 有效的品牌信息
            const createResult = await createAProductModel.save();
            if(createResult){
              res.success(createResult._id);
            }else{
              res.failed(-2, null, '创建失败，请检查参数后重试！');
            }
          }
        }
      }
    }catch(error){
      console.info(error);
      res.failed(-1, null, '创建异常，请检查参数后重试～');
    }
  }),
  // 编辑一个商品
  editProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const params = req.body;
    if(id){
      const updateAProduct = await productModel.findByIdAndUpdate(id, params, {runValidators: true});
      console.info(updateAproduct);
      res.success(updateAProduct);
    }else{
      res.failed(-2, null, '请传递需要修改的商品id');
    }
  }),
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