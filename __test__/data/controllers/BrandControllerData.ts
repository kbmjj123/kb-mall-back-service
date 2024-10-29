import { ResultCode } from "../../../enum/http";
import { UnitTestCaseType } from "../../types/UnitTestCaseType";
import { getGlobalAccessToken } from "../utils/DataUtils";

/**
 * 发布品牌信息单元测试数据源
*/
export const publishBrandTestCases: Array<UnitTestCaseType> = [
	{
		description: 'Successfully launch a brand with multilingual support',
		input: {
			url: '/brand',
			method: 'put',
			header: () => ({
				authorization: `Bearer ${getGlobalAccessToken()}`
			}),
			params: {
				name: ''
			}
		},
		expectedResponse: {
			status: ResultCode.SUCCESS
		}
	}
]

/**
 * 已登录查询品牌单元测试数据源
*/
export const getBrandListWidthLoginStateTestCases: Array<UnitTestCaseType> = []

/**
 * 未登录查询品牌测试数据源
*/
export const getBrandListWithoutLoginTestCases: Array<UnitTestCaseType> = []

/**
 * 编辑品牌信息单元测试数据源
*/
export const editBrandTestCases: Array<UnitTestCaseType> = []

/**
 * 删除品牌信息单元测试数据源
*/
export const deleteBrandTestCases: Array<UnitTestCaseType> = []