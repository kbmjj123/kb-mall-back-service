import mongoose from "mongoose"
import { AddressDTO } from "../dto/AddressDTO"

export const ADDRESS_MODEL_NAME = 'addressModel'
const addressSchema = new mongoose.Schema<AddressDTO>({
	fullName: {
		type: String,
		required: [true, '请维护用户姓名'],
	},
	phone: {
		type: String,
		required: [true, '请维护用户手机号码']
	},
	email: {
		type: String,
		required: [true, '请维护用户邮箱']
	},
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
	},
	userId: mongoose.Types.ObjectId
})

export const AddressModel = mongoose.model(ADDRESS_MODEL_NAME, addressSchema)
