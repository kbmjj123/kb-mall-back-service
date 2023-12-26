const express = require('express')
const userRouter = express.Router()

// 定义一用户路由拦截器中间件
userRouter.use((req, res, next) => {
    console.log('userRouter Time:', Date.now())
    next()
})

// 通过id来获取用户信息
userRouter.get('/', (req, res) => {
    res.json('我是来自于userRouter的json内容响应')
})

module.exports = userRouter