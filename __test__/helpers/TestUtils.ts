import request from 'supertest'
import app from '../../index'

/**
 * 通用接口测试方法
 * @param {string} url - 请求的接口地址
 * @param {'get' | 'post' | 'put' | 'delete'} method - 请求方法
 * @param {object} [requestData] - 请求数据
 */
export const testEndPoint = async (
	url: string,
	method: 'get' | 'post' | 'put' | 'delete' | 'patch',
	requestData: object | undefined | string,
) => {
	let response;
	switch(method){
		case 'get':
			response = await request(app).get(url).send()
			break
		case 'post': 
			response = await request(app).post(url).send(requestData)
			break
		case 'put': 
			response = await request(app).put(url).send(requestData)
			break
		case 'delete': 
			response = await request(app).delete(url).send(requestData)
			break
		case 'patch':
			response = await request(app).patch(url).send(requestData)
			break
		default:
			throw new Error('Unsupported HTTP method!')
	}
	return response
}