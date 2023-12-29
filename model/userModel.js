const mogoose = require('mongoose');
// 映射collection
const userSchema = new mogoose.Schema({
    account: {
      type: String,
      unique: true
    },
    password: String,
    email: String
})
userSchema.pre('save', function(next){
  // console.info('-->即将保存前的回调', this)
  //! 如果这里需要检查是否有存在过相关的账号，然后再确定是否能够执行插入动作的，则需要由外部的controller来执行，
  //! 不能直接在这里进行与db相关的查询操作
  // throw new Error('自定义校验') // 这里如果甩出一个error的话，则将直接通过这个error来拦截校验了，也可以通过throw一个error来拦截
  // next(new Error('自定义校验'))
  next()
})
// 即将对外暴露的相关模型
const userModel = mogoose.model('userModel', userSchema, "users");

module.exports = userModel;