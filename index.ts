import express from 'express'
import noFoundWM from './middleware/NoFoundMW';
import globalParamsValidate from './middleware/GlobalParamsValidateMW'
import serviceErrorMW from './middleware/ServiceErrorMW';
import ResWrapperWM from './middleware/ResWrapperWM';
import cors from 'cors'
import LanguageMW from './middleware/languageMW';
import path from 'path'
import { loadFromEnv } from './config/LoadConfig';
import DbConnection from './config/DbConnection';// 引入数据库连接器

import { RegisterRoutes } from './build/routes';
import { setupSwagger } from './middleware/SwaggerDocMW';

import bodyParser from 'body-parser';// 解析客户端请求体到req.body
import serveStatic from 'serve-static';  // 对于静态资源的直接访问
import { loggerWrap } from './middleware/LogMiddleware';
import { setUpEmailTemplateDebugger } from './middleware/EmailTemplateDebugger'
import requestIp from 'request-ip'

const app = express();
loadFromEnv()
LanguageMW(app)	// 语言安装包中间件

app.use(cors());
//! 追加响应体的中间件，统一格式化响应结果
app.use(ResWrapperWM);

//? 配置获取客户端请求的ip地址中间件
app.use(requestIp.mw())

//? 配置请求输出日志展示的中间件
loggerWrap(app)

//? 配置解析请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//? 配置静态资源直接访问
app.use(serveStatic(path.join(__dirname, 'resources')))

//? 配置邮件模版调试中间件
setUpEmailTemplateDebugger(app)

app.get('/', (req, res) => {
	res.send('<p>服务成功访问了～～</p>')
})
RegisterRoutes(app);
setupSwagger(app);

// 处理请求404
app.use(noFoundWM);
// 全局参数校验
app.use(globalParamsValidate)
// 统一的异常处理
app.use(serviceErrorMW);

// //? 在启动服务之前，连接数据库
// DbConnection().then(() => {
// 	app.listen(process.env.SERVICE_PORT, () => {
// 		console.info('服务启动了～～')
// 	})
// })

//? 对外提供的手动启动服务方法，主要供单元测试所使用
export const startService = async () => {
	//? 在启动服务之前，连接数据库
	await DbConnection()
	return app.listen(process.env.SERVICE_PORT, () => {
		console.info('手动启动服务了～～')
	})
}

if('test' !== process.env.NODE_ENV){
	startService().catch(err => {
		console.error('服务启动发生错误: ', err)
	})
}

export default app