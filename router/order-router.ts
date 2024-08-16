import express from 'express'
const orderRouter = express.Router();
import authWM from '../middleware/auth-middleware'
import orderCtrl from '../control/order-controller'

orderRouter.use(authWM.checkRole);

// 获取订单详情
orderRouter.get('/detail/:id', orderCtrl.getAOrder);
// 获取订单列表
orderRouter.get('/list', orderCtrl.getOrderList);
// 订单发货
orderRouter.post('/:id', orderCtrl.deliveryAOrder);
// 取消订单
orderRouter.post('/:id', orderCtrl.cancelAOrder);

export default orderRouter;