import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ResultCode } from '../enum/http'
import { UserCode } from '../enum/code/UserCode'
import { UserService } from '../service/UserService'
import { UserDTO } from '../dto/UserDTO'
import { AccountState } from '../enum/business'

/**
 * 用户是否已登录的拦截中间件
 * 主要根据用户记录中是否拥有refreshToken值来进行判断
*/
export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
	// 获取客户端携带的token信息
	let token = req?.headers?.authorization;
	if (token) {
		token = token.split(' ')[1];
		if(token && 'undefined' !== token && 'null' !== token){
			try {
				const userService: UserService = new UserService()
				const decodeInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
				// decodeInfo.id 存在，则是一个有效的用户id，说明是一个正常的登录状态
				const findUser = await userService.findById(decodeInfo.id, req);
				if (findUser) {
					//// 这里针对需要鉴权登录的相关接口，追加一个自动延活token的逻辑
					// const refreshToken = TokenGenerator.generateRefreshToken(decodeInfo.id)
					// const accessToken = TokenGenerator.generateAccessToken(decodeInfo.id)
					// const updateUser = await userService.findOneAndUpdate(req, {_id: decodeInfo.id}, { $set: { accessToken, refreshToken } })
					// 将已经验证通过的账号信息追加到req.user中，并传递给下一个中间件
					req.user = findUser
					// 直接在中间件这里做一个拦截
					next();
				} else {
					res.failed(UserCode.LOGIN_TIMEOUT, null, req.t('user.loginTimeOut'))
				}
			} catch (error) {
				responseJWTError(req, res, error as jwt.VerifyErrors)
				res.failed(ResultCode.FORBIT, '', req.t('user.permissionLimitTip'))
			}
		}else{
			res.failed(UserCode.LOGIN_TIMEOUT, null, req.t('token.accessTokenError'))
		}
	} else {
		res.failed(UserCode.LOGIN_TIMEOUT, null, req.t('user.loginTimeOut'))
	}
}

/**
 * 检查账号是否有效，用于判断是否能够正常使用系统
*/
export const checkAccountAvailable = (req: Request, res: Response, next: NextFunction) => {
	const user = req.user as UserDTO
	if(user){
		if(user.state === AccountState.IN_USED){
			next()
		}else{
			res.failed(UserCode.ACCOUNT_REJECTED, null, req.t('account.accountRejected'))
		}
	}
}

/**
 * 针对jwt解码异常的统一处理
*/
const responseJWTError = (req: Request, res: Response, error: jwt.VerifyErrors) => {
	if(error){
		if('TokenExpiredError' === error.name){
			// token过期
			return res.failed(ResultCode.ACCESS_TOKEN_EXPIRED, error, req.t('token.accessTokenExpired'))
		}else if('JsonWebTokenError' === error.name){
			// 错误的token
			return res.failed(ResultCode.ACCESS_TOKEN_INVALID, error, req.t('token.accessTokenError'))
		}else if('NotBeforeError' === error.name){
			// 传递了未激活的token
			return res.failed(ResultCode.ACCESS_TOKEN_NOT_ACTIVE, error, req.t('token.accessTokenNoActive'))
		}
	}else{
		return res.failed(ResultCode.FAILED, null, req.t('tip.failed'))
	}
}

// 默认的全局拦截判断逻辑
export const checkRole = async (req: Request, res: Response, next: NextFunction) => {
	// 获取客户端携带的token信息
	let token = req?.headers?.authorization;
	if(token){
		token = token.split(' ')[1] as string;
		try {
			const decodeInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
			// decodeInfo.id 存在，则是一个有效的用户id，说明是一个正常的登录状态
			const userService = new UserService()
			const findUser = await userService.findById(decodeInfo.id, req);
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
	}else{
		res.failed(UserCode.LOGIN_TIMEOUT, null, req.t('user.loginTimeOut') )
	}
}
