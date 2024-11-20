import { UserDTO, UserLoginParams } from "../dto/UserDTO";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { Tags, Route, Request, Body, Get, Post, Patch, Middlewares } from 'tsoa'
import { BaseObjectEntity } from "../entity/BaseObjectEntity";
import TokenGenerator from "../config/TokenGenerator";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserService } from "../service/UserService";
import { checkLogin } from "../middleware/AuthMiddleware";

import { UserCode } from "../enum/code/UserCode";
import { ResultCode } from "../enum/http";

@Route('user')
@Tags('用户模块')
export class UserController extends BaseController {

	/**
	 * 用户登录接口
	*/
	@Post('/login')
	public async checkUser(@Request() req: ExpressRequest, @Body() requestBody: UserLoginParams): Promise<BaseObjectEntity<UserDTO>> {
		const res = req.res
		const { email, password } = requestBody;
		const userService = new UserService()
		const findUser = await userService.isExist({ email }, req);
		if (findUser) {
			//? 用户存在，则校验对应的密码
			if (await findUser.isPasswordMatched(password)) {
				//匹配上了，则追加登录成功的token以及token的有效时间点，返回当前用户节点信息
				const accessToken = TokenGenerator.generateAccessToken(findUser.id);
				const refreshToken = TokenGenerator.generateRefreshToken(findUser.id);
				// 针对找到的用户信息追加token
				const updateUser = await userService.findOneAndUpdate(req, { _id: findUser.id }, { $set: { accessToken, refreshToken, loginTime: new Date() } }, { new: true, select: '-password' })
				if (updateUser) {
					res?.cookie("accessToken", accessToken, {
						httpOnly: true,
						maxAge: Number(process.env.JWT_ACCESS_EXPIRES_IN_TIME)
					});
					return this.successResponse(req, updateUser)
				} else {
					return this.failedResponse(req, req.t('system.error'))
				}
			} else {
				return this.failedResponse(req, req.t('user.accountOrPasswordError'), UserCode.ACCOUNT_OR_PWD_ERROR)
			}
		} else {
			// 用户不存在
			return this.failedResponse(req, req.t('user.emailNoExist'), UserCode.USER_NO_EXIST)
		}
	}

	/**
	 * 获取当前登录用户信息
	*/
	@Get('/info')
	@Middlewares([checkLogin])
	public async getUserInfo(@Request() req: ExpressRequest): Promise<BaseObjectEntity<UserDTO>> {
		const findUser = req.user
		if (findUser) {
			return this.successResponse(req, findUser)
		} else {
			return this.failedResponse(req, req.t('user.loginTimeOut'))
		}
	}


	/**
	 * 退出登录
	*/
	@Post('/logout')
	@Middlewares([checkLogin])
	public async logout(@Request() req: ExpressRequest): Promise<BaseObjectEntity<String | null>> {
		const user = req.user
		if (user) {
			const userService = new UserService()
			const updateUser = await userService.update(user._id, { logoutTime: new Date(), accessToken: null, refreshToken: null }, req)
			if (updateUser) {
				return this.successResponse(req, updateUser.id)
			} else {
				return this.failedResponse(req, req.t('system.error'))
			}
		} else {
			return this.failedResponse(req, req.t('user.accountNoExist'))
		}
	}



	/**
	 * 刷新用户的accessToken以及refreshToken，即延长用户的在线有效性
	*/
	@Patch('/refreshToken')
	public async refreshToken(@Request() req: ExpressRequest, @Body() requestBody: { refreshToken: string }): Promise<BaseObjectEntity<{ accessToken: string, refreshToken: string }>> {
		let { refreshToken } = requestBody
		if (refreshToken) {
			const userService = new UserService()
			// 如果用户传递了token，则从db中查询是否有对应的用户信息
			const decodeInfo = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
			if (decodeInfo && decodeInfo.id) {
				// 有效的token-->更新为新的token
				refreshToken = TokenGenerator.generateRefreshToken(decodeInfo.id);
				const accessToken = TokenGenerator.generateAccessToken(decodeInfo.id);
				const updateUser = await userService.findOneAndUpdate(req, { _id: decodeInfo.id }, { $set: { accessToken, refreshToken } });
				if (updateUser) {
					// 更新成功后，需要客户端对应的替换本地的accessToken与refreshToken来保持客户端延活
					return this.successResponse(req, {
						accessToken,
						refreshToken
					})
				} else {
					return this.failedResponse(req, req.t('user.needValidateToken'), ResultCode.PARAMS_ERROR);
				}
			} else {
				// 用户的refreshToken中传递了无效的用户id
				return this.failedResponse(req, req.t('user.permissionLimitTip'), ResultCode.FORBIT)
			}
		} else {
			return this.failedResponse(req, req.t('user.needValidateToken'), ResultCode.PARAMS_ERROR)
		}
	}

}