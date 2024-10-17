import type { UnitTestCaseType } from '../../types/UnitTestCaseType'
import { validateAccountInfo } from '../../helpers/MockData'
import { ResultCode } from '../../../enum/http'

/**
 * 登录单元测试数据源
*/
export const loginTestCases: Array<UnitTestCaseType> = [
	{
		description: 'Login using the correct account and password',
		input: {
			url: '/user/login',
			method: 'post',
			params: {...validateAccountInfo}
		},
		expectedResponse: {
			status: ResultCode.SUCCESS
		}
	},
	// {
	// 	description: 'Login using incorrect account and password',
	// 	input: {
	// 		url: '/user/login',
	// 		method: 'post',
	// 		params: {}
	// 	},
	// 	expectedResponse: {
	// 		status: -1
	// 	}
	// }
]

/**
 * 自己单元测试数据源
*/
export const registerTestCases = []