const asyncHandler = require('express-async-handler');
const productModel = require('../model/product-model');

module.exports = {
  // 发布一个商品
  createProduct: asyncHandler(async (req, res) => {}),
  // 编辑一个商品
  editProduct: asyncHandler(async (req, res) => {}),
  // 上/下架商品
  upOrDownAProduct: asyncHandler(async (req, res) => {}),
  // 删除一个商品
  removeAProduct: asyncHandler(async (req, res) => {}),
  // 获取一个商品明细信息
  getAProduct: asyncHandler(async (req, res) => {}),
  // 分页获取商品列表信息
  getProductList: asyncHandler(async (req, res) => {})
};