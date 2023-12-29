const asyncHandler = require('express-async-handler');
const userModel = require('../model/userModel');

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
  // 检查用户是否完全正确
  checkUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if(findUser){
      //? 用户存在，则校验对应的密码
      if(await findUser.isPasswordMatched(password)){
        //匹配上了，则登录成功，返回当前用户节点信息
        res.success(findUser)
      }
    }else{
      // 用户不存在
      res.failed(-1, null, '用户名或密码错误！')
    }
  })
}