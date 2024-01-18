const asyncHandler = require('express-async-handler');

module.exports = {
  // 拿到文件后，对响应结果进行包装后返回
  wrapFile: asyncHandler(async (req, res) => {
    console.info(req.file)
    res.success(req.file)
  }),
  // 多文件上传处理器
  wrapFiles: asyncHandler(async (req, res) => {
    console.info(req)
  })
}