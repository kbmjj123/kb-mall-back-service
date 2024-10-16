import { startService } from "../../index";

export default async function globalSetup() {
	if(!global.server){
		global.server = await startService()
		console.info('手动全局服务启动完毕')
	}
}