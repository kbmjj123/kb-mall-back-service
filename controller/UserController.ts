import { IUser } from "@/dto/IUser";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { Tags, Route, Request, Path, Body, Get, Post, Put, Delete, Patch } from 'tsoa'
import { BaseObjectEntity } from "@/entity/BaseObjectEntity";
import { User } from "@/model/User";
import tokenGenerator from "@/config/token-generator";
import jwt, { JwtPayload } from 'jsonwebtoken'

type EditUserParams = Pick<IUser, 'email' | 'account' | 'avatar' | 'nickName'>
type UserWithoutToken = Omit<IUser, 'password' | 'refreshToken' | 'accessToken' | 'logoutTime'>
type UserLoginParams = Pick<IUser, 'account' | 'password' | 'email'>

@Route('user')
@Tags('用户模块')
export class UserController extends BaseController {
	/**
	 * 创建用户，主要提供为用户自主注册
	*/
	@Post('/register')
	public async createUser(@Request() req: ExpressRequest, @Body() requestBody: UserLoginParams): Promise<BaseObjectEntity<IUser>> {
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
	// }
	/**
	 * 根据id获取用户信息
	 * @param id 用户id
	*/
	@Get('{id}')
	public async getAUser(@Path() id: string, @Request() req: ExpressRequest): Promise<BaseObjectEntity<UserWithoutToken>> {
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

	/**
	 * 用户登录接口
	*/
	@Post('/login')
	public async checkUser(@Request() req: ExpressRequest, @Body() requestBody: UserLoginParams): Promise<BaseObjectEntity<IUser>> {
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
	public async refreshToken(@Request() req: ExpressRequest, @Body() requestBody: { refreshToken: string }): Promise<BaseObjectEntity<{accessToken: string, refreshToken: string}>> {
		let { refreshToken } = requestBody
		if(refreshToken){
			// 如果用户传递了token，则从db中查询是否有对应的用户信息
			const decodeInfo = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
      if(decodeInfo && decodeInfo.id){
        // 有效的token-->更新为新的token
        refreshToken = tokenGenerator.generateRefreshToken(decodeInfo.id);
        const accessToken = tokenGenerator.generateAccessToken(decodeInfo.id);
        const updateUser = await User.findOneAndUpdate({_id: decodeInfo.id}, { $set: { accessToken, refreshToken } });
        if(updateUser){
          // 更新成功后，需要客户端对应的替换本地的accessToken与refreshToken来保持客户端延活
					return this.successResponse(req, {
            accessToken,
            refreshToken
          })
        }else{
          return this.failedResponse(req, req.t('user.needValidateToken'));
        }
      }else{
				return this.failedResponse(req, req.t('user.permissionLimitTip'))
      }
		}else{
			return this.failedResponse(req, req.t('user.needValidateToken'))
		}
	}

	/**
	 * 删除一个用户
	*/
}