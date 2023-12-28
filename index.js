const express = require("express");
const notFoundMw = require('./middleware/not-found-middleware');
const serviceErrorMw = require('./middleware/service-error-middleware');
const responseWrapperMw = require('./middleware/response-wrapper-middleware.js');
const routes = require('./router');
const app = express();
const dbConnection = require('./config/db-connection.js');// 引入数据库连接器
require('dotenv').config(); // 加载.env环境变量，使得整个程序可以通过process.env访问到.env文件中定义的变量

const bodyParser = require('body-parser');

//! 追加响应体的中间件，统一格式化响应结果
app.use(responseWrapperMw);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.success('服务成功访问了～～');
})
routes(app);  // 借鉴于模块化管理，将路由对外暴露统一的一个接口

// 处理请求404
app.use(notFoundMw);
// 统一的异常处理
app.use(serviceErrorMw);

app.listen(process.env.SERVICE_PORT, () => {
  console.info('服务启动了～～')
  //? 服务启动成功的时候，连接数据库
  dbConnection();
})