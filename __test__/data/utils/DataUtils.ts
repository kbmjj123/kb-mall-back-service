import { Request } from "express";

/**
 * 获取全局的accessToken
*/
export const getGlobalAccessToken = () => {
	console.info('全局可用的token=', global.appendHeaders)
	return global.appendHeaders && global.appendHeaders['accessToken']
}

/**
 * 获取全局的refreshToken
*/
export const getGlobalRefreshToken = () => {
	return global.appendHeaders && global.appendHeaders['refreshToken']
}

/**
 * 模拟express.request，用于给service层进行构造生成
*/
export const getMockedRequest = (): Partial<Request> => ({
	headers: {
		authorization: `Bearer ${getGlobalAccessToken()}`
	}
})