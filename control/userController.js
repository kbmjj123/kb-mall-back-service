const asyncHandler = require('express-async-handler');
const userModel = require('../model/userModel');

module.exports = {
  createUser: asyncHandler(async (req, res) => {
    debugger
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
  })
}