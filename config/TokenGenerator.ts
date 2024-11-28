import jwt, { JwtPayload } from 'jsonwebtoken'
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
	},
	/**
	 * 根据用户id以及愿望清单id生成唯一的token
	 * @param id 愿望订单id
	 * @returns 
	 */
	generateShareWishlistToken: (id: string) => {
		return jwt.sign({ id }, process.env.JWT_WISHLIST_SECRET as string, { expiresIn: Number(process.env.JWT_WISHLIST_EXPIRES_IN_TIME) })
	},
	/**
	 * 根据分享的token，获取对应的愿望清单id以及用户id
	 * @param token 链接传递过来的token
	 * @returns 
	 */
	validateWishlistToken: (token: string) => {
		try{
			const decodeInfo = jwt.verify(token, process.env.JWT_WISHLIST_SECRET as string) as JwtPayload
			if(decodeInfo.id){
				return decodeInfo.id
			}else{
				return null
			}
		}catch(error){
			const errorObj = error as jwt.VerifyErrors
			if('TokenExpiredError' === errorObj.name){
				// token过期
			}else if('JsonWebTokenError' === errorObj.name){
				// 错误的token
			}else if('NotBeforeError' === errorObj.name){
				// 传递了未激活的token
			}
		}
		return null
	}
}