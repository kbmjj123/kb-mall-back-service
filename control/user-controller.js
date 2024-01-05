const asyncHandler = require('express-async-handler');
const userModel = require('../model/user-model');
const tokenGenerator = require('../config/token-generator.js')
const jwt = require('jsonwebtoken');

module.exports = {
  // 创建用户
  createUser: asyncHandler(async (req, res) => {
    const { email, account, password } = req.body;
    const findUser = await userModel.findOne({ email })
    if(!findUser){
      // db中不存在这个邮箱的用户，则允许创建一新的用户
      const createUser = await userModel.create(req.body);
      res.success(createUser);
    }else{
      // db中已存在，则拒绝创建
      res.failed(-1, null, '此邮箱已存在，请勿重复创建！')
    }
  }),
  // 检查用户是否完全正确，校验成功后，自动追加token
  checkUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if(findUser){
      //? 用户存在，则校验对应的密码
      if(await findUser.isPasswordMatched(password)){
        //匹配上了，则追加登录成功的token以及token的有效时间点，返回当前用户节点信息
        const accessToken = tokenGenerator.generateAccessToken(findUser._id);
        const refreshToken = tokenGenerator.generateRefreshToken(findUser._id);
        // 针对找到的用户信息追加token
        const updateUser = await userModel.updateOne({ _id: findUser._id }, { $set: { accessToken, refreshToken } })
        if(updateUser.acknowledged && 1 === updateUser.modifiedCount){
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: Number(process.env.JWT_ACCESS_EXPIRES_IN_TIME)
          });
          res.success({
            _id: findUser._id,
            email: findUser.email,
            account: findUser.account,
            role: findUser.role,
            accessToken: accessToken,
            refreshToken: refreshToken
          })
        }else{
          res.failed(-1, '', '系统异常，请稍后重试！')
        }
      }
    }else{
      // 用户不存在
      res.failed(-1, null, '用户名或密码错误！')
    }
  }),
  // 刷新用户的accessToken与refreshToken
  refreshToken: asyncHandler(async (req, res) => {
    // 从请求体中获取提交过来的refreshToken
    let { refreshToken } = req.body;
    if(refreshToken){
      // 如果用户传递了token，则去db中查询是否有对应的
      const decodeInfo = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      if(decodeInfo && decodeInfo.id){
        // 有效的token-->更新为新的token
        refreshToken = tokenGenerator.generateRefreshToken(decodeInfo.id);
        const accessToken = tokenGenerator.generateAccessToken(decodeInfo.id);
        const updateUser = await userModel.findOneAndUpdate({_id: decodeInfo.id}, { $set: { accessToken, refreshToken } });
        if(updateUser){
          // 更新成功后，需要客户端对应的替换本地的accessToken与refreshToken来保持客户端延活
          res.success({
            accessToken,
            refreshToken
          });
        }else{
          res.failed(-1, '', '请传递有效的refreshToken!');
        }
      }else{
        res.failed(403, '', '当前用户无权限')
      }
    }else{
      res.failed(-1, '', '请传递有效的refreshToken!');
    }
  }),
  // 查询用户信息
  getAUser: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(id){
      const findUser = await userModel.findOne({ _id: id })
      if(!findUser){
        res.failed(-1, null, '用户不存在，请传递正确的id')
      }else{
        res.success({
          _id: findUser._id,
          email: findUser.email,
          account: findUser.account
        });
      }
    }else{
      res.failed(-1, null, '请传递有效的用户id')
    }
  })
}