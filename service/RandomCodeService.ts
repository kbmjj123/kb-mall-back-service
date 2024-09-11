import random from 'random'
import { Request } from 'express'
import { CodeModel } from '@/models/CodeModel'
import { CodeType } from '@/enum/user'

/**
 * 生成6位数字的验证码
*/
export const generateRandomCode = async (req: Request) => {
	//? 生成6位数的随机验证码，然后记录到db中
	const code = `${random.int(100000, 999999)}`
	const aCode = await CodeModel.create({
		content: code,
		codeType: CodeType.REGISTER,
		isUsed: false
	})
}