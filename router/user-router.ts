import express from 'express'
const userRouter = express.Router();
import userController from '../control/user-controller'
import authWM from '../middleware/auth-middleware'

//! 通过使用公共的鉴权中间件，代表当前的userRouter整个模块都是需要鉴权控制的
userRouter.use(authWM.checkRole);
// 通过id来获取用户信息
userRouter.get('/', (req, res, next) => {
	res.json('我是来自于userRouter的json内容响应')
})
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: 获取用户信息
 *     description: 根据用户id获取用户信息
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 用户信息对象
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 key:
 *                   type: string
 */
userRouter.get('/:id', userController.getAUser);
// 刷新登录用户的token，即延长用户的在线有效性
userRouter.patch('/refreshToken', userController.refreshToken);

export default userRouter