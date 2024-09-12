import random from 'random'
import { Request } from 'express'
import { CodeModel } from '@/models/CodeModel'
import { CodeType } from '@/enum/user'
import { BaseService } from './base/BaseService'
import { CodeDTO } from '@/dto/CodeDTO'

export class CodeService extends BaseService<CodeDTO> {

	constructor(){
		super(CodeModel)
	}

	/**
	 * 生成随机验证码
	 * @returns 验证码对象
	 */
	public async generateRandomCode() {
		//? 生成6位数的随机验证码，然后记录到db中
		const code = `${random.int(100000, 999999)}`
		const aCode = await CodeModel.create({
			content: code,
			codeType: CodeType.REGISTER,
			isUsed: false
		})
		return aCode
	}
}