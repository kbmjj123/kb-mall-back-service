
export default async function globalTeardown() {
	if(global.server){
		global.server.close()
		console.info('手动关闭服务了')
	}
}