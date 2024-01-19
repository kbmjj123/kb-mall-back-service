const asyncHandler = require('express-async-handler');
const cateModel = require('../model/cate-model');

module.exports = {
  // 获取分类列表数据
  getCateList: asyncHandler(async (req, res) => {}),
  // 新增分类
  addACate: asyncHandler(async (req, res) => {
    
  }),
  // 修改分类
  editACate: asyncHandler(async (req, res) => {}),
  // 删除分类
  removeACate: asyncHandler(async (req, res) => {})
};