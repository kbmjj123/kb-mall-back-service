import { testEndPoint } from "../../helpers/TestUtils";
import { describe, expect, test } from "@jest/globals";
import { loginTestCases } from "../../data/controllers/UserControllerData";
import { ResultCode } from "../../../enum/http";
import jwt, { JwtPayload } from "jsonwebtoken";

describe('User Test Cases', () => {
	// 新用户注册
	// 忘记密码-> 重置密码
	// 修改密码
	//? 用户登录
	test.each(loginTestCases)('$description', async ({ input, expectedResponse }) => {
		const response = await testEndPoint(input.url, input.method, input.params, expectedResponse.status)
		if(response.body.status === ResultCode){
			// 针对成功过的情况进行详细的验证
			expect(response.body).toHaveProperty('data')
			const data = response.body.data
			if(data){
				// 登录成功的用户必须拥有登录的token
				expect(data).toHaveProperty('accessToken')
				const decodeInfo = jwt.verify(data.assessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload
				expect(decodeInfo).toHaveProperty('id')
			}
			
		}
	})
	// 退出登录
	// 账号注销 
	
})