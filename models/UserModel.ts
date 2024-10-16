import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from 'bcrypt'
import { UserDTO } from "../dto/UserDTO";

const userSchema = new mongoose.Schema<UserDTO>({
	account: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		required: [true, '请维护用户密码'],
		hide: true	// 通过mongoose-hidden插件，将该属性默认情况下配置为隐藏的
	},
	email: {
		type: String,
		required: [true, '请维护账号邮箱']
	},
	refreshToken: String,
	accessToken: String,
	role: {
		type: String,
		default: 'user',
		enum: ['admin', 'user'],
		require: [true, '请维护用户角色']
	},
	nickName: {
		type: String,
		default: ''
	},
	avatar: {
		type: String,
		default: ''
	},
	address: {
		type: mongoose.SchemaTypes.ObjectId,
		default: ''
	},
	loginTime: {
		type: Date,
		hide: true
	},
	logoutTime: Date
})

type UserScheType = InferSchemaType<typeof userSchema>


userSchema.pre('save', async function(next){
  //? 在密码存储之前，对密码进行加盐加密
  this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT));
  //! 如果这里需要检查是否有存在过相关的账号，然后再确定是否能够执行插入动作的，则需要由外部的controller来执行，
  //! 不能直接在这里进行与db相关的查询操作
  // throw new Error('自定义校验') // 这里如果甩出一个error的话，则将直接通过这个error来拦截校验了，也可以通过throw一个error来拦截
  // next(new Error('自定义校验'))
  next()
})
userSchema.method('isPasswordMatched', async function (newPwd: string) {
	return await bcrypt.compare(newPwd, this.password)
})

export const UserModel = mongoose.model<UserScheType>('userModal', userSchema, "users");