const express = require('express');
const productRouter = express.Router();
const authWM = require('../middleware/auth-middleware');
const productCtrl = require('../control/product-controller');
const cateCtrl = require('../control/cate-controller');
const brandCtrl = require('../control/brand-controller');

productRouter.use(authWM.checkRole);

// 分页获取商品列表信息
productRouter.get('/list', productCtrl.getProductList);
// 获取一个商品明细信息
productRouter.get('/:id', productCtrl.getAProduct);
// 发布一个商品
productRouter.put('/publish', productCtrl.createProduct);
// 编辑商品信息
productRouter.post('/:id', productCtrl.editProduct);
// 删除一个商品
productRouter.delete('/:id', productCtrl.removeAProduct);
// 上/下架商品
productRouter.post('/:id', productCtrl.upOrDownAProduct);

// ********** 以下是分类相关的接口定义 **********
// 获取分类列表数据
productRouter.get('/cate/list', cateCtrl.getCateList);
// 新增分类
productRouter.put('/cate', cateCtrl.addACate);
// 修改分类
productRouter.post('/cate/:id', cateCtrl.editACate);
// 删除分类
productRouter.delete('/cate/:id', cateCtrl.removeACate);

// ********** 以下是品牌相关的接口定义 **********
// 获取品牌列表
productRouter.get('/brand/list', brandCtrl.getBrandList);
// 新增品牌
productRouter.put('/brand', brandCtrl.addABrand);
// 编辑品牌
productRouter.post('/brand/:id', brandCtrl.editABrand);
// 删除品牌
productRouter.delete('/brand/:id', brandCtrl.removeABrand);


module.exports = productRouter;