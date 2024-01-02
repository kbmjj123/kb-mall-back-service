const asyncHandler = require('express-async-handler');
const userModel = require('../model/userModel');
const generateToken = require('../config/generate-token.js')

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
        const refreshToken = generateToken(findUser._id);
        // 针对找到的用户信息追加token
        const updateUser = userModel.updateOne({ _id: findUser._id }, { refreshToken })
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: Number(process.env.JWT_EXPIRES_IN_TIME)
        });
        res.success({
          _id: findUser._id,
          email: findUser.email,
          account: findUser.account,
          token: refreshToken
        })
      }
    }else{
      // 用户不存在
      res.failed(-1, null, '用户名或密码错误！')
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
        console.info(findUser.email)
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