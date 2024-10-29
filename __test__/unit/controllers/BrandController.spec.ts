import { startService } from "../../.."
import { cacheTokens } from "../../helpers/TestUtils"


beforeAll(async () => {
	if (!global.server) {
		global.server = await startService()
		console.info('手动全局服务启动完毕')
	}
})

describe('@@@@@@@@@@@ Brand Test Cases @@@@@@@@@@@', () => {
	
	describe('Need login state', () => {
		beforeAll(async () => {
			await cacheTokens()
		})
		//? 发布一个新的品牌
		describe.only('**** Launch a brand with multi-language support ****', () => {
			
		})

		//? 已登录获取品牌列表数据
		describe('**** Get brand list information in logged in state ****', () => {

		})
		//? 编辑品牌信息
		describe('**** Edit brand information ****', () => {})

		//? 删除一品牌
		describe('**** Delete a brand ****', () => {

		})
	})
	
	//? 免登录获取品牌列表数据
	describe('**** Get brand list data without logging in ****', () => {})
	
})