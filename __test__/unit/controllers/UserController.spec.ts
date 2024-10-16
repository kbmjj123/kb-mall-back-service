import { testEndPoint } from "../../helpers/TestUtils";
import { describe, expect, test } from "@jest/globals";
import { loginTestCases } from "../../data/controllers/UserControllerData";

describe('User Test Cases', () => {
	// 新用户注册
	// 忘记密码-> 重置密码
	// 修改密码
	//? 用户登录
	test.each(loginTestCases)('$description', async ({ input, expectedResponse }) => {
		const response = await testEndPoint(input.url, input.method, input.params)
		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual(expect.objectContaining({
			status: expectedResponse.status
		}))
	})
	// 退出登录
	// 账号注销 
})