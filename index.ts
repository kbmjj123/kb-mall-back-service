import express from 'express'
import noFoundWM from './middleware/NoFoundMW';
import globalParamsValidate from './middleware/GlobalParamsValidateMW'
import serviceErrorMW from './middleware/ServiceErrorMW';
import ResWrapperWM from './middleware/ResWrapperWM';
import cors from 'cors'
import LanguageMW from './middleware/LanguageMW';
import path from 'path'
const app = express();
import DbConnection from './config/DbConnection';// 引入数据库连接器
import dotenv from 'dotenv'
dotenv.config()	// 加载.env环境变量，使得整个程序可以通过process.env访问到.env文件中定义的变量
import { RegisterRoutes } from './build/routes';
import { setupSwagger } from './middleware/SwaggerDocMW';

import bodyParser from 'body-parser';// 解析客户端请求体到req.body
import serveStatic from 'serve-static';  // 对于静态资源的直接访问
import { loggerWrap } from './middleware/LogMiddleware';
import { setUpEmailTemplateDebugger } from './middleware/EmailTemplateDebugger'
import requestIp from 'request-ip'

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

app.listen(process.env.SERVICE_PORT, () => {
  console.info('服务启动了～～')
  //? 服务启动成功的时候，连接数据库
  DbConnection();
})