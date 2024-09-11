import mongoose from "mongoose";
import { CodeDTO } from "@/dto/CodeDTO";

const codeSchema = new mongoose.Schema<CodeDTO>({
	content: {
		type: String,
		length: 6
	},
	codeType: {
		type: String,
		enum: ['register', 'reset-pwd'],
		require: [true, '请维护验证码类型']
	},
	isUsed: {
		type: Boolean,
		default: false
	}
})


export const CodeModel = mongoose.model<CodeDTO>('codeModel', codeSchema, 'codes')