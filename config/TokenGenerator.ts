import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

//* 将与jwt加密生成的token相关的，合并为一对象，并对外暴露该对象
export default {
	/**
	 * 生成资源访问的token
	 * @param id 用户id
	 */
	generateAccessToken: (id: Types.ObjectId | string) => {
		return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN_TIME) })
	},
	/**
	 * 生成刷新的token
	 * @param id 用户id
	 */
	generateRefreshToken: (id: Types.ObjectId | string) => {
		return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN_TIME) });
	},
	/**
	 * 生成注册或者重置密码链接所需的token
	 * @param email 注册/忘记密码的邮箱
	*/
	generateValidateToken: (email: string) => {
		return jwt.sign({
			email
		}, process.env.JWT_ACCESS_SECRET as string, { expiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN_TIME) })
	}
}