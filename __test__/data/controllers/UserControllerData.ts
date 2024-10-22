import type { UnitTestCaseType } from '../../types/UnitTestCaseType'
import { validateAccountInfo, alreadyCanceledAccountInfo } from '../../helpers/MockData'
import { ResultCode } from '../../../enum/http'
import { UserCode } from '../../../enum/code/UserCode'
import { getGlobalAccessToken } from '../utils/DataUtils'


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
 * 获取当前登录用户信息数据源
*/
export const loginedTestCases: Array<UnitTestCaseType> = [
	{
		description: 'Query the user information of successful login',
		input: {
			url: '/user/info',
			method: 'get',
			params: {},
			header: () => ({
				authorization: `Bearer ${getGlobalAccessToken()}`
			})
		},
		expectedResponse: {
			status: ResultCode.SUCCESS
		}
	},
	{
		description: 'No token is brought to access resources that require authentication',
		input: {
			url: '/user/info',
			method: 'get',
			params: {},
		},
		expectedResponse: {
			status: UserCode.LOGIN_TIMEOUT
		}
	},
	{
		description: 'Carrying the wrong token to access resources that require authentication',
		input: {
			url: '/user/info',
			method: 'get',
			params: {},
			header: {
				authorization: `Bearer ${getGlobalAccessToken()}-78987`
			}
		},
		expectedResponse: {
			status: ResultCode.FORBIT
		}
	},
]

/**
 * 用户注册单元测试数据源
*/
export const registerTestCases = []

/**
 * 修改用户信息 单元测试数据源
*/
export const modifyUserInfoTestCases: Array<UnitTestCaseType> = [
	{
		description: 'Modify user information',
		input: {
			url: '/user/edit',
			method: 'post',
			params: {
				account: '我是新的账号', 
				avatar: 'xxx.png', 
				nickName: '我是新昵称'
			},
			header: () => ({
				authorization: `Bearer ${getGlobalAccessToken()}`
			})
		},
		expectedResponse: {
			status: ResultCode.SUCCESS
		}
	},
	{
		description: 'Account no exist',
		input: {
			url: '/user/edit',
			method: 'post',
			params: {},
			header: () => ({
				authorization: `Bearer ${getGlobalAccessToken()}--88888`
			})
		},
		expectedResponse: {
			status: UserCode.USER_NO_EXIST
		}
	},
	{
		description: 'No parameters are carried to modify user information',
		input: {
			url: '/user/edit',
			method: 'post',
			params: {},
			header: () => ({
				authorization: `Bearer ${getGlobalAccessToken()}`
			})
		},
		expectedResponse: {
			status: ResultCode.PARAMS_ERROR
		}
	}
]

/**
 * 退出登录 单元测试数据源
*/
export const logoutTestCases: Array<UnitTestCaseType> = [
	{
		description: 'User logs out normally',
		input: {
			url: '/user/logout',
			method: 'post',
			params: {},
			header: () => ({
				authorization: `Bearer ${getGlobalAccessToken()}`
			})
		},
		expectedResponse: {
			status: ResultCode.SUCCESS
		}
	}
]