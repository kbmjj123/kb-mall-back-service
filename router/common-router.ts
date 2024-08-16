import express from 'express'
const commonRouter = express.Router();
import userController from '../control/user-controller'

// 处理用户注册的中间件
commonRouter.post('/register', userController.createUser);
commonRouter.post('/login', userController.checkUser);

export default commonRouter;