const express = require('express')
const userRouter = express.Router();
const asyncHandler = require('express-async-handler');
const userController = require('../control/userController');

// 定义一"用户模块"路由拦截器中间件
userRouter.use((req, res, next) => {
    console.log('userRouter Time:', Date.now())
    next()
})

// 通过id来获取用户信息
userRouter.get('/', (req, res, next) => {
    res.json('我是来自于userRouter的json内容响应')
})

// 处理用户注册的中间件
userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.checkUser);

module.exports = userRouter