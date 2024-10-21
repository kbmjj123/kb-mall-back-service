import { UnitTestCaseType } from "../../types/UnitTestCaseType";

export const getGlobalAccessToken = () => {
	console.info('全局可用的token=', global.appendHeaders)
	return global.appendHeaders && global.appendHeaders['authorization']
}
