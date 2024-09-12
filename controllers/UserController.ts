import { UserDTO, UserLoginParams, UserQuickRegisterParams, UserRegisterParams } from "@/dto/UserDTO";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { Tags, Route, Request, Path, Body, Get, Post, Put, Delete, Patch, Queries } from 'tsoa'
import { BaseObjectEntity } from "@/entity/BaseObjectEntity";
import TokenGenerator from "@/config/TokenGenerator";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { sendRandomCodeEmail, sendRegister, sendResetPwdEmail } from '@/service/EmailSenderService'
import { UserService } from "@/service/UserService";
import { CodeService } from "@/service/CodeService";


@Route('user')
@Tags('用户模块')
export class UserController extends BaseController {

	/**
	 * 根据邮箱获取注册的链接
	*/
	@Get('getRegisterLink')
	public async getRegisterLink(@Request() req: ExpressRequest, @Queries() query: { email: string }): Promise<BaseObjectEntity<string>> {
		const userServie = new UserService(req)
		const { email } = query
		const findUser = await userServie.isExist(email)
		if (!findUser) {
			// 邮箱账号不存在，允许下一步操作
			const result = await sendRegister(email, req.t)
			if (result) {
				return this.successResponse(req, '邮件发送成功')
			} else {
				return this.failedResponse(req, '邮件发送失败')
			}
		} else {
			return this.failedResponse(req, req.t('user.emailAlreadyExist'))
		}
	}

	/**
	 * 重置密码
	*/
	@Post('resetPwd')
	public async resetPwd(@Request() req: ExpressRequest, @Body() params: { token: string, password: string }): Promise<BaseObjectEntity<string>> {
		const { token, password } = params
		if (token) {
			const userService = new UserService(req)
			const decodeInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload
			if (decodeInfo && decodeInfo.email) {
				const email = decodeInfo.email
				const updateUser = await userService.findOneAndUpdate(req, { email }, { password })
				if (updateUser) {
					return this.successResponse(req, '')
				} else {
					return this.failedResponse(req, '')
				}
			}
		}
		return this.failedResponse(req, '')
	}

	/**
	 * 根据邮箱获取重置密码的链接
	*/
	@Get('getResetPwdLink')
	public async getResetPwdLink(@Request() req: ExpressRequest, @Queries() query: { email: string }): Promise<BaseObjectEntity<string>> {
		const { email } = query
		const userService = new UserService(req)
		const findUser = await userService.isExist(email)
		if (findUser) {
			const result = await sendResetPwdEmail(email, req.t)
			if (result) {
				return this.successResponse(req, '')
			} else {
				return this.failedResponse(req, '')
			}
		} else {
			return this.failedResponse(req, req.t('user.emailNoExist'))
		}
	}

	/**
	 * 快速注册获取验证码邮件
	*/
	@Get('quickRegisterCode')
	public async getQuickRegisterCode(@Request() req: ExpressRequest, @Queries() query: { email: string }) {
		const { email } = query
		const codeService = new CodeService()
		const userService = new UserService(req)
		const findUser = await userService.isExist(email)
		if (!findUser) {
			//? 生成6位数的随机验证码，然后记录到db中
			const aCode = await codeService.generateRandomCode()
			if (aCode) {
				const result = await sendRandomCodeEmail(email, aCode.content as string, req.t)
				if (result) {
					return this.successResponse(req, '')
				} else {
					return this.failedResponse(req, '')
				}
			} else {
				return this.failedResponse(req, req.t('code.generateError'))
			}
		} else {
			return this.failedResponse(req, req.t(''))
		}
	}

	/**
	 * 通过邮件验证码进行快速注册
	*/
	@Post('/registerWithCode')
	public async registerWithCode(@Request() req: ExpressRequest, @Body() params: UserQuickRegisterParams): Promise<BaseObjectEntity<UserDTO>> {
		const { email, code, password } = params
		const userService = new UserService(req)
		const codeService = new CodeService()
		const findUser = await userService.isExist(email)
		const account = email.substring(0, email.indexOf('@'))
		if (!findUser) {
			// db中不存在这个邮箱的用户，则允许创建一新的用户
			//? 验证这个验证码是否正确
			const findCode = await codeService.findOne({ content: code, isUsed: false }, req)
			if (findCode) {
				//? 如果找到了对应的验证码，则允许进行新账号的注册
				const createUser = await userService.create({ email, password, account }, req)
				return this.successResponse(req, createUser)
			} else {
				return this.failedResponse(req, req.t('code.codeError'))
			}
		} else {
			// db中已存在，则拒绝创建
			return this.failedResponse(req, req.t('user.emailAlreadyExist'))
		}
	}

	/**
	 * 新用户注册
	*/
	@Post('/register')
	public async createUser(@Request() req: ExpressRequest, @Body() requestBody: UserRegisterParams): Promise<BaseObjectEntity<UserDTO>> {
		const userService = new UserService(req)
		const { password, token } = requestBody;
		if (token) {
			try {
				const decodeInfo = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload
				if (decodeInfo && decodeInfo.email) {
					const email = decodeInfo.email
					const account = email.substring(0, email.indexOf('@'))
					const findUser = await userService.isExist(email)
					if (!findUser) {
						// db中不存在这个邮箱的用户，则允许创建一新的用户
						const createUser = await userService.create({ email, password, account }, req);
						return this.successResponse(req, createUser)
					} else {
						// db中已存在，则拒绝创建
						return this.failedResponse(req, req.t('user.emailAlreadyExist'))
					}
				} else {
					return this.failedResponse(req, req.t('user.tokenInValidate'))
				}
			}catch(err){
				return this.failedResponse(req, req.t('user.needValidateToken'))
			}
		} else {
			return this.failedResponse(req, req.t('user.needValidateToken'))
		}
	}
	/**
	 * 修改用户信息，主要为用户自主修改
	*/
	// @Post('{id}')
	// public async modifyAUser(@Path() id: string, @Request() req: ExpressRequest, @Body() requestBody: EditUserParams): Promise<BaseObjectEntity<UserDTO>> {
	// }

	/**
	 * 用户登录接口
	*/
	@Post('/login')
	public async checkUser(@Request() req: ExpressRequest, @Body() requestBody: UserLoginParams): Promise<BaseObjectEntity<UserDTO>> {
		const res = req.res
		const { email, password } = requestBody;
		const userService = new UserService(req)
		const findUser = await userService.isExist(email);
		if (findUser) {
			//? 用户存在，则校验对应的密码
			if (await findUser.isPasswordMatched(password)) {
				//匹配上了，则追加登录成功的token以及token的有效时间点，返回当前用户节点信息
				const accessToken = TokenGenerator.generateAccessToken(findUser._id);
				const refreshToken = TokenGenerator.generateRefreshToken(findUser._id);
				// 针对找到的用户信息追加token
				const updateUser = await userService.findOneAndUpdate(req, { _id: findUser._id }, { $set: { accessToken, refreshToken } })
				if (updateUser) {
					res?.cookie("accessToken", accessToken, {
						httpOnly: true,
						maxAge: Number(process.env.JWT_ACCESS_EXPIRES_IN_TIME)
					});
					return this.successResponse(req, findUser)
				} else {
					return this.failedResponse(req, '系统异常，请稍后重试！')
				}
			} else {
				return this.failedResponse(req, '用户名或密码错误！')
			}
		} else {
			// 用户不存在
			return this.failedResponse(req, '用户名或密码错误！')
		}
	}

	/**
	 * 刷新用户的accessToken以及refreshToken，即延长用户的在线有效性
	*/
	@Patch('/refreshToken')
	public async refreshToken(@Request() req: ExpressRequest, @Body() requestBody: { refreshToken: string }): Promise<BaseObjectEntity<{ accessToken: string, refreshToken: string }>> {
		let { refreshToken } = requestBody
		if (refreshToken) {
			const userService = new UserService(req)
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
					return this.failedResponse(req, req.t('user.needValidateToken'));
				}
			} else {
				return this.failedResponse(req, req.t('user.permissionLimitTip'))
			}
		} else {
			return this.failedResponse(req, req.t('user.needValidateToken'))
		}
	}

	/**
	 * 删除一个用户
	*/
}