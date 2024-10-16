import { HttpMethod } from "../../enum/http"
import { BaseObjectEntity } from "../../entity/BaseObjectEntity"

/**
 * 请求参数类型
*/
export type RequestType = {
	url: string,
	method: HttpMethod,
	params?: Record<string, any>,
	header?: Record<string, any>,
}



/**
 * 单元测试所需的每个测试数据源的数据结构
*/
export interface UnitTestCaseType {
	description: string,		// 用例描述 
	input: RequestType,			// 请求入参相关
	mockReturnValue?: any,		// 模拟返回结果
	expectedResponse: BaseObjectEntity<any>	// 期望响应结果
}