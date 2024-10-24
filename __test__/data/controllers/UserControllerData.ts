import type { UnitTestCaseType } from '../../types/UnitTestCaseType'
import { validateAccountInfo, alreadyCanceledAccountInfo } from '../../helpers/MockData'
import { ResultCode } from '../../../enum/http'
import { UserCode } from '../../../enum/code/UserCode'
import { getGlobalAccessToken } from '../utils/DataUtils'


const noExistAccount = 'uuu@uuu.com'

/**
 * 发送带token的注册链接
*/
export const generateRegisterCodeTestCases: Array<UnitTestCaseType> = [
	{
		description: 'Generate a registration link with token',
		input: {
			url: '/user/getRegisterLink',
			method: 'get',
			params: {}
		},
		expectedResponse: {
			status: ResultCode.SUCCESS
		}
	},
	{
		description: 'Email already exist',
		input: {
			url: '/user/getRegisterLink',
			method: 'get',
			params: {
				email: validateAccountInfo.email
			}
		},
		expectedResponse: {
			status: UserCode.USER_ALREADY_EXIST
		}
	}
]

/**
 * 刷新token的单元测试数据
*/
export const refreshTokenTestCases: Array<UnitTestCaseType> = [
	{
		description: 'Use refreshToken to refresh the old token',
		input: {
			url: '/user/refreshToken',
			method: 'patch',
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
		description: 'No refreshToken is carried for the refresh token operation',
		input: {
			url: '/user/refreshToken',
			method: 'patch',
			params: {
				refreshToken: ''
			}
		},
		expectedResponse: {
			status: ResultCode.PARAMS_ERROR
		}
	},
	{
		description: 'Bring an expired accessToken to refresh the token',
		input: {
			url: '/user/refreshToken',
			method: 'patch',
			params: {
				refreshToken: ''
			},
			header: () => ({
				authorization: `Bearer ${getGlobalAccessToken()}`
			})
		},
		expectedResponse: {
			status: UserCode.LOGIN_TIMEOUT
		}
	}
]

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
export const registerTestCases: Array<UnitTestCaseType> = [
	{
		description: 'Register new account successfully',
		input: {
			url: '/user/register',
			method: 'post',
			params: {
				password: '', 
				token: ''
			}
		},
		expectedResponse: {
			status: ResultCode.SUCCESS
		}
	},
	{
		description: 'Account already exists',
		input: {
			url: '/user/register',
			method: 'post',
			params: {
				password: '',
				token: ''
			}
		},
		expectedResponse: {
			status: UserCode.USER_ALREADY_EXIST
		},
	},
	{
		description: 'Invalidate params',
		input: {
			url: '/user/register',
			method: 'post',
			params: {}
		},
		expectedResponse: {
			status: ResultCode.PARAMS_ERROR
		}
	}
]

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
 * 修改用户密码(根据旧密码修改新密码)
*/
export const modifyPwdWithOldPwdTestCases: Array<UnitTestCaseType> = [
	{
		description: 'Successfully changed the new password using the old password',
		input: {
			url: '/user/modifyPwd',
			method: 'post',
			params: {
				oldPassword: validateAccountInfo.password,
				newPassword: validateAccountInfo.newPassword
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
		description: 'Invalidate params',
		input: {
			url: '/user/modifyPwd',
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

/**
 * 用户注销
*/
export const deleteUserTestCases: Array<UnitTestCaseType> = [
	{
		description: 'User delete',
		input: {
			url: '/user/delete',
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