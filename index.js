const express = require("express");
const notFoundMw = require('./middleware/not-found-middleware');
const serviceErrorMw = require('./middleware/service-error-middleware');
const responseWrapperMw = require('./middleware/response-wrapper-middleware.js');
const routes = require('./router');
const app = express();


//! 追加响应体的中间件，统一格式化响应结果
app.use(responseWrapperMw);

app.get('/', (req, res) => {
  res.success('服务成功访问了～～');
})
routes(app);  // 借鉴于模块化管理，将路由对外暴露统一的一个接口

// 处理请求404
app.use(notFoundMw);
// 统一的异常处理
app.use(serviceErrorMw);

app.listen(3000, () => {
  console.info('服务启动了～～')
})