const express = require('express');
const productRouter = express.Router();
const authWM = require('../middleware/auth-middleware');
const productCtrl = require('../control/product-controller');

productRouter.use(authWM.checkRole);

productRouter.get('/', prod)

module.exports = productRouter;