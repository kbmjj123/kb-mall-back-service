const jwt = require('jsonwebtoken');
const userModel = require('../model/user-model');

module.exports = async (req, res, next) => {
    // 获取客户端携带的token信息
    let token = req?.headers?.authorization;
    token = token.split(' ')[1];
    try{
      const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      // decode.id 存在，则是一个有效的用户id，说明是一个正常的登录状态
      const findUser = await userModel.findById(decode.id);
      if(findUser.account){
        // 将已经验证通过的账号信息追加到req.user中，并传递给下一个中间件
          req.user = findUser
          // 直接在中间件这里做一个拦截
          if('user' === findUser.role){
            res.failed(403, '', '当前用户无权限')
          }else{
            next();
          }
      }else{
          res.failed(-1, null, '登录超时！')
      }
    }catch(error){
      res.failed(403, '', '当前用户无权限')
    }
}