import mongoose, { InferSchemaType, Types } from "mongoose";
import bcrypt from 'bcrypt'
import { UserDTO } from "../dto/UserDTO";
import { AccountState } from "../enum/business";

const addressSchema = new mongoose.Schema({
	country: {
		type: String,
		required: [true, '国家/地区代码，建议使用 ISO 3166-1 标准（如 US、CN）']
	},
	state: {
		type: String,
		minLength: 1,
		maxLength: 100,
		required: [true, '省/州/地区名称，长度限制一般为 1-100 字符']
	},
	city: {
		type: String,
		minLength: 1,
		maxLength: 100,
		required: [true, '城市名称，长度限制一般为 1-100 字符']
	},
	district: {
		type: String,
		minLength: 1,
		maxLength: 100,
	},
	streetAddressLine1: {
		type: String,
		minLength: 10,
		maxLength: 255,
	},
	streetAddressLine2: {
		type: String,
		minLength: 10,
		maxLength: 255,
	},
	postalCode: {
		type: String,
		minLength: 3,
		maxLength: 20,
	} 
})

export const AddressModel = mongoose.model('addressModel', addressSchema)

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
		type: Types.ObjectId,
		ref: 'addressModel',
		default: null
	},
	loginTime: {
		type: Date
	},
	state: {
		type: String,
		enum: Object.values(AccountState),
		default: AccountState.IN_USED
	},
	firstName: String,
	lastName: String,
	createTime: Date,
	logoutTime: Date
})
export const USER_MODEL_NAME = 'userModal'
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

export const UserModel = mongoose.model<UserScheType>(USER_MODEL_NAME, userSchema, "users");