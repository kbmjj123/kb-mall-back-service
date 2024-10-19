import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserModel } from '../models/UserModel'
import { Request, Response, NextFunction } from 'express'
import { ResultCode } from '../enum/http'
import { UserCode } from '../enum/code/UserCode'
import TokenGenerator from '../config/TokenGenerator'
import { UserService } from '../service/UserService'

/**
 * 用户是否已登录的拦截中间件
 * 主要根据用户记录中是否拥有refreshToken值来进行判断
*/
export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
	// 获取客户端携带的token信息
	let token = req?.headers?.authorization;
	if (token) {
		token = token.split(' ')[1];
		try {
			const userService: UserService = new UserService(req)
			const decodeInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
			// decodeInfo.id 存在，则是一个有效的用户id，说明是一个正常的登录状态
			const findUser = await UserModel.findById(decodeInfo.id);
			if (findUser?.refreshToken) {
				//! 这里针对需要鉴权登录的相关接口，追加一个自动延活token的逻辑
				const refreshToken = TokenGenerator.generateRefreshToken(decodeInfo.id)
				const accessToken = TokenGenerator.generateAccessToken(decodeInfo.id)
				const updateUser = await userService.findOneAndUpdate(req, {_id: decodeInfo.id}, { $set: { accessToken, refreshToken } })
				// 将已经验证通过的账号信息追加到req.user中，并传递给下一个中间件
				if(updateUser){
					req.user = updateUser
				}
				// 直接在中间件这里做一个拦截
				next();
			} else {
				res.failed(UserCode.LOGIN_TIMEOUT, null, req.t('user.loginTimeOut'))
			}
		} catch (error) {
			res.failed(ResultCode.FORBIT, '', req.t('user.permissionLimitTip'))
		}
	} else {
		res.failed(UserCode.LOGIN_TIMEOUT, null, req.t('user.loginTimeOut'))
	}
}
// 默认的全局拦截判断逻辑
export const checkRole = async (req: Request, res: Response, next: NextFunction) => {
	// 获取客户端携带的token信息
	let token = req?.headers?.authorization;
	token = token?.split(' ')[1] as string;
	try {
		const decodeInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
		// decodeInfo.id 存在，则是一个有效的用户id，说明是一个正常的登录状态
		const findUser = await UserModel.findById(decodeInfo.id);
		if (findUser?.account) {
			// 将已经验证通过的账号信息追加到req.user中，并传递给下一个中间件
			req.user = findUser
			// 直接在中间件这里做一个拦截
			if ('user' === findUser.role) {
				res.failed(ResultCode.FORBIT, '', req.t('user.permissionLimitTip'))
			} else {
				next();
			}
		} else {
			res.failed(UserCode.LOGIN_TIMEOUT, null, req.t('user.loginTimeOut'))
		}
	} catch (error) {
		res.failed(ResultCode.FORBIT, '', req.t('user.permissionLimitTip'))
	}
}
