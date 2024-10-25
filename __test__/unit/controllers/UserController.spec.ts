import { cacheTokens, testEndPoint } from "../../helpers/TestUtils";
import { describe, expect, test, beforeAll } from "@jest/globals";
import { deleteUserTestCases, generateRegisterCodeTestCases, loginTestCases, loginedTestCases, logoutTestCases, modifyPwdWithOldPwdTestCases, modifyUserInfoTestCases, refreshTokenTestCases, registerTestCases } from "../../data/controllers/UserControllerData";
import { ResultCode } from "../../../enum/http";
import jwt, { JwtPayload } from "jsonwebtoken";
import { startService } from "../../../index";
import { UserService } from "../../../service/UserService";
import { getGlobalRefreshToken, getMockedRequest } from "../../data/utils/DataUtils";
import { Request } from "express";
import { UnitTestCaseType } from "../../types/UnitTestCaseType";

beforeAll(async () => {
	if (!global.server) {
		global.server = await startService()
		console.info('手动全局服务启动完毕')
	}
})

describe('@@@@@@@@@@@ User Test Cases @@@@@@@@@@@', () => {
	
	//? 获取注册新账号的所需的链接，这里仅简化为token的生成
	describe('**** Generate register token ****', () => {
		test.each(generateRegisterCodeTestCases)('$descriptioin', async params => {
			// 先随机生成一个邮箱账号来注册
			// 设置模拟函数的返回值(主要是模拟发送邮件动作)
		})
	})

	//? 新用户注册
	describe('**** Register new account ****', () => {
		test.each(registerTestCases)('$description', async params => {

		})
	})
	// 修改密码 -> 根据旧密码来修改新密码
	describe('**** Modify password with old password ****', () => {
		test.each(modifyPwdWithOldPwdTestCases)('$description', async params => {
			const response = await testEndPoint(params)
			if(response.body.status === ResultCode.SUCCESS){
				expect(response.body).toHaveProperty('data')
				const data = response.body.data
				if(data){

				}
			}
		})
	})
	// 忘记密码-> 重置密码
	//? 修改密码
	describe('**** Modify User Password', () => {

	})
	//? 用户登录
	describe('**** User Login ****', () => {
		test.each(loginTestCases)('$description', async (params) => {
			const response = await testEndPoint(params)
			if (response.body.status === ResultCode.SUCCESS) {
				// 针对成功过的情况进行详细的验证
				expect(response.body).toHaveProperty('data')
				const data = response.body.data
				if (data) {
					// 登录成功的用户必须拥有登录的token
					expect(data).toHaveProperty('accessToken')
					const decodeInfo = jwt.verify(data.accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload
					expect(decodeInfo).toHaveProperty('id')
				}
			}
		})
	})

	//? 刷新token
	describe.only('**** Refresh token ****', () => {
		beforeAll(async () => {
			await cacheTokens()
		})
		test.each(refreshTokenTestCases)('$description', async params => {
			if(params.expectedResponse.status === ResultCode.SUCCESS){
				params.input.params = {
					// 针对预期将要成功刷新token的场景传递正确的待刷新token参数
					refreshToken: getGlobalRefreshToken()
				}
			}
			const response = await testEndPoint(params)
			if(response.body.status === ResultCode.SUCCESS){
				// 针对实际已经成功的场景进行对应的校验操作
				
			}
		})
		// 成功后--> 用户的refreshToken是否发生了变化，modifyTime是否发生了变化
	})

	//? 获取登录用户信息--> 从请求头中捞对应的token
	describe('**** Get User Info ****', () => {
		beforeAll(async () => {
			// 执行一次用户登录，用来获取到对应的用户信息token
			await cacheTokens()
		})
		test.each(loginedTestCases)('$description', async (params) => {
			const response = await testEndPoint(params)
		})
	})
	
	//? 修改用户信息
	describe('**** Modify User Info ****', () => {
		beforeAll(async () => {
			// 执行一次用户登录，用来获取到对应的用户信息token
			await cacheTokens()
		})
		test.each(modifyUserInfoTestCases)('$description', async (params) => {
			const response = await testEndPoint(params)
			if(response.body.status === ResultCode.SUCCESS){
				const testParams = params.input.params!
				expect(response.body).toHaveProperty('data')
				const data = response.body.data
				if(data){
					expect(data).toHaveProperty('id')
					expect(testParams.account).toBe(data.account)
					expect(testParams.avatar).toBe(data.avatar)
					expect(testParams.nickName).toBe(data.nickName)
				}
			}
		})
	})

	//? 退出登录
	describe('**** User Logout ****', () => {
		beforeAll(async () => {
			// 先正常登录
			await cacheTokens()
		})
		test.each(logoutTestCases)('$description', async (params) => {
			const response = await testEndPoint(params)
			if(response.body.status === ResultCode.SUCCESS) {
				expect(response.body).toHaveProperty('data')
				const userId = response.body.data		// 获取到退出登录的当前用户id
				expect(userId).not.toBeNull()
				const req = getMockedRequest() as Request
				const userService = new UserService(req)
				const findAUser = await userService.findById(userId, req)
				expect(findAUser).not.toBeNull()
			}
		})
	})
	//? 用户删除
	describe('**** User Delete ****', () => {
		test.each(deleteUserTestCases)('$description', async params => {
			// 注册新账号
			// 缓存新账号相关信息
			const response = await testEndPoint(params)
			expect(response.body.status).toBe(ResultCode.SUCCESS)
			expect(response.body).toHaveProperty('data')
			const data = response.body.data
			expect(data.deleteTime).not.toBeNull()
			// 使用临时注册的账号来登录，看是否提示已经被删除，无法进行正常登录了
			const loginRes = await testEndPoint({} as UnitTestCaseType)
		})
	})

})