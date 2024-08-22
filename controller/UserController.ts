import { IUser } from "@/dto/IUser";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { Tags, Route, Request, Path, Body, Get, Post, Put, Delete } from 'tsoa'
import { BaseObjectEntity } from "@/entity/BaseObjectEntity";
import { User } from "@/model/User";
import tokenGenerator from "@/config/token-generator";

type EditUserParams = Pick<IUser, 'email' | 'account' | 'avatar' | 'nickName'>

@Route('user')
@Tags('用户模块')
export class UserController extends BaseController {
	/**
	 * 创建用户，主要提供为用户自主注册
	*/
	@Post('/register')
	public async createUser(@Request() req: ExpressRequest, @Body() requestBody: Record<string, any>): Promise<BaseObjectEntity<IUser>> {
		const { email, account, password } = requestBody;
		const findUser = await User.findOne({ email })
		if (!findUser) {
			// db中不存在这个邮箱的用户，则允许创建一新的用户
			const createUser = await User.create(requestBody);
			return this.successResponse(req, createUser)
		} else {
			// db中已存在，则拒绝创建
			return this.failedResponse(req, '此邮箱已存在，请勿重复创建！')
		}
	}
	/**
	 * 修改用户信息，主要为用户自主修改
	*/
	// @Post('{id}')
	// public async modifyAUser(@Path() id: string, @Request() req: ExpressRequest, @Body() requestBody: EditUserParams): Promise<BaseObjectEntity<UserDTO>> {
	// 	return this.successResponse(req, new IUser())
	// }
	/**
	 * 根据id获取用户信息
	 * @param id 用户id
	*/
	@Get('{id}')
	public async getAUser(@Path() id: string, @Request() req: ExpressRequest): Promise<BaseObjectEntity<IUser>> {
		if (id) {
			const findUser = await User.findOne({ _id: id })
			if (!findUser) {
				return this.failedResponse(req, '用户不存在，请传递正确的id')
			} else {
				return this.successResponse(req, findUser, '操作成功')
			}
		} else {
			return this.failedResponse(req, '请传递有效的用户id')
		}
	}

	@Post('/login')
	public async checkUser(@Request() req: ExpressRequest, @Body() requestBody: Record<string, any>): Promise<BaseObjectEntity<IUser>> {
		const res = req.res
		const { email, password } = requestBody;
		const findUser = await User.findOne({ email });
		if (findUser) {
			//? 用户存在，则校验对应的密码
			if (await findUser.isPasswordMatched(password)) {
				//匹配上了，则追加登录成功的token以及token的有效时间点，返回当前用户节点信息
				const accessToken = tokenGenerator.generateAccessToken(findUser._id);
				const refreshToken = tokenGenerator.generateRefreshToken(findUser._id);
				// 针对找到的用户信息追加token
				const updateUser = await User.updateOne({ _id: findUser._id }, { $set: { accessToken, refreshToken } })
				if (updateUser.acknowledged && 1 === updateUser.modifiedCount) {
					res!.cookie("accessToken", accessToken, {
						httpOnly: true,
						maxAge: Number(process.env.JWT_ACCESS_EXPIRES_IN_TIME)
					});
					return this.successResponse(req, findUser)
				} else {
					return this.failedResponse(req, '系统异常，请稍后重试！')
				}
			}else{
				return this.failedResponse(req, '用户名或密码错误！')
			}
		} else {
			// 用户不存在
			return this.failedResponse(req, '用户名或密码错误！')
		}
	}

}