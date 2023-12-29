const mogoose = require('mongoose');
const bcrypt = require('bcrypt'); // 加密加盐用途

// 映射collection
const userSchema = new mogoose.Schema({
    account: {
      type: String,
      unique: true
    },
    password: String,
    email: String
})
userSchema.pre('save', async function(next){
  //? 在密码存储之前，对密码进行加盐加密
  this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT));
  // console.info('-->即将保存前的回调', this)
  //! 如果这里需要检查是否有存在过相关的账号，然后再确定是否能够执行插入动作的，则需要由外部的controller来执行，
  //! 不能直接在这里进行与db相关的查询操作
  // throw new Error('自定义校验') // 这里如果甩出一个error的话，则将直接通过这个error来拦截校验了，也可以通过throw一个error来拦截
  // next(new Error('自定义校验'))
  next()
})
// 这里我们采用了向userModel实例对象中添加了实例方法，用于比对查询到的密码与传递的密码是否一致
userSchema.methods.isPasswordMatched = async function(newPwd){
  // 这里newPwd为客户端传递的密码，this.password代表通过匹配账号得来的用户信息中的密码属性
  return await bcrypt.compare(newPwd, this.password)
}
// 即将对外暴露的相关模型
const userModel = mogoose.model('userModel', userSchema, "users");

module.exports = userModel;