const asyncHandler = require('express-async-handler');
const productModel = require('../model/product-model');

module.exports = {
  // 发布一个商品
  createProduct: asyncHandler(async (req, res) => {
    const params = req.body;
    try{
      const createAProduct = await productModel.create(params);
      res.success(createAProduct);
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
      const updateAProduct = await productModel.findByIdAndUpdate(id, params);
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
        const updateAProduct = await productModel.findByIdAndUpdate(id, {
          $set: { state }
        })
      }
    }else{
      res.failed(-2, null, '请传递需要修改的商品id');
    }
  }),
  // 删除一个商品
  removeAProduct: asyncHandler(async (req, res) => {

  }),
  // 获取一个商品明细信息
  getAProduct: asyncHandler(async (req, res) => {

  }),
  // 分页获取商品列表信息
  getProductList: asyncHandler(async (req, res) => {
    
  })
};