import dotenv from 'dotenv'
/**
 * 加载本地环境变量中的配置文件
 */
export const loadFromEnv = () => {
	dotenv.config({
		path: [
			'.env', `.env.${process.env.NODE_ENV || 'development'}`
		],
		debug: true,
		override: true
	})	// 加载.env环境变量，使得整个程序可以通过process.env访问到.env文件中定义的变量
}