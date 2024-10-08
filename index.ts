import express from 'express'
import noFoundWM from './middleware/NoFoundMW';
import serviceErrorMW from './middleware/ServiceErrorMW';
import ResWrapperWM from './middleware/ResWrapperWM';
import cors from 'cors'
import languageMW from './middleware/languageMW';
import path from 'path'
const app = express();
import DbConnection from './config/DbConnection';// 引入数据库连接器
import dotenv from 'dotenv'
dotenv.config()	// 加载.env环境变量，使得整个程序可以通过process.env访问到.env文件中定义的变量
import { RegisterRoutes } from './build/routes';
import { setupSwagger } from './middleware/SwaggerDocMW';

import bodyParser from 'body-parser';// 解析客户端请求体到req.body
import morgan from 'morgan';//友好输出请求日志信息
import serveStatic from 'serve-static';  // 对于静态资源的直接访问

languageMW(app)	// 语言安装包中间件

app.use(cors());
//! 追加响应体的中间件，统一格式化响应结果
app.use(ResWrapperWM);

//? 配置请求输出日志展示的中间件
app.use(morgan('combined'));

//? 配置解析请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//? 配置静态资源直接访问
app.use(serveStatic(path.join(__dirname, 'resources')))

app.get('/', (req, res) => {
	res.send('<p>服务成功访问了～～</p>')
})
RegisterRoutes(app);
setupSwagger(app);
// routes(app);  // 借鉴于模块化管理，将路由对外暴露统一的一个接口

// 处理请求404
app.use(noFoundWM);
// 统一的异常处理
app.use(serviceErrorMW);

app.listen(process.env.SERVICE_PORT, () => {
  console.info('服务启动了～～')
  //? 服务启动成功的时候，连接数据库
  DbConnection();
})