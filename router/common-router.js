const express = require('express');
const commonRouter = express.Router();
const userController = require('../control/user-controller');

// 处理用户注册的中间件
commonRouter.post('/register', userController.createUser);
commonRouter.post('/login', userController.checkUser);

module.exports = commonRouter;