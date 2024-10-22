import request from 'supertest'
import { expect } from '@jest/globals'
import { HttpCode, ResultCode } from '../../enum/http';
import { validateAccountInfo } from './MockData';
import { UnitTestCaseType } from '../types/UnitTestCaseType';

/**
 * 通用接口测试方法
 * @param testParams 单元测试参数
 */
export const testEndPoint = async (testParams: UnitTestCaseType) => {
	const { expectedResponse } = testParams
	const { url, header, params, method } = testParams.input
	let response;
	switch (method) {
		case 'get':
			response = await request(global.server).get(url).send().set(header ? typeof header === 'function' ? header() : header : {})
			break
		case 'post':
			response = await request(global.server).post(url).send(params).set(header ? typeof header === 'function' ? header() : header : {})
			break
		case 'put':
			response = await request(global.server).put(url).send(params).set(header ? typeof header === 'function' ? header() : header : {})
			break
		case 'delete':
			response = await request(global.server).delete(url).send(params).set(header ? typeof header === 'function' ? header() : header : {})
			break
		case 'patch':
			response = await request(global.server).patch(url).send(params).set(header ? typeof header === 'function' ? header() : header : {})
			break
		default:
			throw new Error('Unsupported HTTP method!')
	}
	//? ***************** 以下是公共的校验操作 *****************
	// 接口响应码统一为200
	expect(response.statusCode).toBe(HttpCode.SUCCESS)
	// 响应体内容的校验：统一包含固定的数据结构，一般是包含status、message属性
	expect(response.body).toHaveProperty('status')
	expect(response.body).toHaveProperty('message')
	// 业务响应体是否与预期响应结果编码一致
	expect(response.body).toEqual(expect.objectContaining({
		status: expectedResponse.status
	}))
	//? ***************** 公共校验结束 *****************
	return response
}

/**
 * 抽离出来的一个登录成功的动作，将登录成功后的token存储到全局中，后续都自动从这个中获取
*/
export const cacheAccessToken = async () => {
	const response = await request(global.server).post('/user/login').send(validateAccountInfo)
	if(response.body.status === ResultCode.SUCCESS){
		const token = response.body.data.accessToken
		if(!global.appendHeaders){
			global.appendHeaders = {}
		}
		global.appendHeaders['authorization'] = token
		console.info('完成token的全局缓存', token)
	}
}
