import type { UnitTestCaseType } from '../../types/UnitTestCaseType'
import { validateAccountInfo, alreadyCanceledAccountInfo } from '../../helpers/MockData'
import { ResultCode } from '../../../enum/http'
import { UserCode } from '../../../enum/code/UserCode'

const noExistAccount = 'uuu@uuu.com'

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
	{
		description: 'Account does not exist',
		input: {
			url: '/user/login',
			method: 'post',
			params: {
				email: noExistAccount,
				password: '4567890'
			}
		},
		expectedResponse: {
			status: UserCode.USER_NO_EXIST
		}
	},
	{
		description: 'Login using incorrect account and password',
		input: {
			url: '/user/login',
			method: 'post',
			params: {
				email: 'kbmjj123@gmail.com',
				password: '5678909876556'
			}
		},
		expectedResponse: {
			status: UserCode.ACCOUNT_OR_PWD_ERROR
		}
	},
	// {
	// 	description: 'Account has been cancelled',
	// 	input: {
	// 		url: '/user/login',
	// 		method: 'post',
	// 		params: {...alreadyCanceledAccountInfo}
	// 	},
	// 	expectedResponse: {
	// 		status: UserCode.USER_ALREADY_CANCELED
	// 	}
	// }
]

/**
 * 自己单元测试数据源
*/
export const registerTestCases = []