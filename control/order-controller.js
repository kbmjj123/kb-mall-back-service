const asyncHandler = require('express-async-handler');
const orderModel = require('../model/order-model');

module.exports = {
  // 获取订单列表
  getOrderList: asyncHandler(async (req, res) => {}),
  // 订单发货
  deliveryAOrder: asyncHandler(async (req, res) => {}),
  // 取消订单
  cancelAOrder: asyncHandler(async (req, res) => {}),
  // 获取订单详情
  getAOrder: asyncHandler(async (req, res) => {})
};