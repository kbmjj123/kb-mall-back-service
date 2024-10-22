import { cacheAccessToken, testEndPoint } from "../../helpers/TestUtils";
import { describe, expect, test, beforeAll } from "@jest/globals";
import { loginTestCases, loginedTestCases, logoutTestCases, modifyUserInfoTestCases } from "../../data/controllers/UserControllerData";
import { ResultCode } from "../../../enum/http";
import jwt, { JwtPayload } from "jsonwebtoken";
import { startService } from "../../../index";
import { UserService } from "../../../service/UserService";
import { getMockedRequest } from "../../data/utils/DataUtils";
import { Request } from "express";

beforeAll(async () => {
	if (!global.server) {
		global.server = await startService()
		console.info('手动全局服务启动完毕')
	}
})

describe('@@@@@@@@@@@ User Test Cases @@@@@@@@@@@', () => {
	//? 新用户注册
	describe('**** Register new account ****', () => {
		
	})
	// 忘记密码-> 重置密码
	//? 修改密码
	// describe('**** Modify User Password', () => {})
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
					const decodeInfo = jwt.verify(data.assessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload
					expect(decodeInfo).toHaveProperty('id')
				}
			}
		})
	})

	//? 获取登录用户信息--> 从请求头中捞对应的token
	describe('**** Get User Info ****', () => {
		beforeAll(async () => {
			// 执行一次用户登录，用来获取到对应的用户信息token
			await cacheAccessToken()
		})
		test.each(loginedTestCases)('$description', async (params) => {
			const response = await testEndPoint(params)
		})
	})
	
	//? 修改用户信息
	describe('**** Modify User Info ****', () => {
		beforeAll(async () => {
			// 执行一次用户登录，用来获取到对应的用户信息token
			await cacheAccessToken()
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
			await cacheAccessToken()
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
	//? 用户注销
	describe('**** User Delete ****', () => {

	})

})