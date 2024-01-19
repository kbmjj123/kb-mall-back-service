const asyncHandler = require('express-async-handler');
const brandModel = require('../model/brand-model');

module.exports = {
  // 获取品牌列表
  getBrandList: asyncHandler(async (req, res) => {}),
  // 新增一品牌
  addABrand: asyncHandler(async (req, res) => {}),
  // 编辑一品牌
  editABrand: asyncHandler(async (req, res) => {}),
  // 删除一品牌
  removeABrand: asyncHandler(async (req, res) => {})
};