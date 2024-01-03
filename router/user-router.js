const express = require('express')
const userRouter = express.Router();
const userController = require('../control/user-controller');
const authWM = require('../middleware/auth-middleware');

//! 通过使用公共的鉴权中间件，代表当前的userRouter整个模块都是需要鉴权控制的
userRouter.use(authWM);
// 通过id来获取用户信息
userRouter.get('/', (req, res, next) => {
    res.json('我是来自于userRouter的json内容响应')
})

userRouter.get('/:id', userController.getAUser);

module.exports = userRouter