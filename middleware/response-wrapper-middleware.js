const SUCCESS_FLAG = 0;
const SUCCESS_MSG = '操作成功'
const FAILED_FLAG = -1;
const FAILED_MSG = '操作失败'

module.exports = function(req, res, next) {
  // 追加自定义统一的成功响应方法
  res.success = function(payload, msg = ''){
    return res.json({
      status: SUCCESS_FLAG,
      data: payload,
      message: msg || SUCCESS_MSG
    })
  }
  // 追加自定义统一失败的响应方法，额外追加响应结果枚举，主要用于响应业务逻辑失败的场景
  res.failed = function(status = -1, payload = null, msg = ''){
    return res.json({
      status: status || FAILED_FLAG,
      data: payload,
      message: FAILED_MSG || msg
    })
  }
  next()
}