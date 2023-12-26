const express = require("express");
const notFoundMw = require('./middleware/not-found-middleware');
const serviceErrorMw = require('./middleware/service-error-middleware');

const app = express();

app.get('/', (req, res) => {
  res.json('服务成功访问了～～');
})
app.get('/login', (req, res, next) => {
  const error = new Error('自定义异常信息')
  throw error;
})

// 处理请求404
app.use(notFoundMw);
// 统一的异常处理
app.use(serviceErrorMw);

app.listen(3000, () => {
  console.info('服务启动了～～')
})