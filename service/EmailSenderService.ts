import nodemailer, { SendMailOptions } from 'nodemailer'
import Logger from '@/utils/Logger';
import path from 'path'
import ejs from 'ejs'

// 创建一个 SMTP 传输实例
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_ACCOUNT, // 使用环境变量
		pass: process.env.GMAIL_PASSWORD  // 使用环境变量
	}
});

enum TemplateType {
	WELCOME,
	REGISTER,
	RESET_PWD,
	VALIDATE_ACCOUNT
}
/**
 * 根据模版类型加载对应的模版信息，渲染为对应的html字符串
*/
const loadTemplateByType = async (templateType: TemplateType, data: any) => {
	let fileName = 'welcome'
	switch (templateType) {
		case TemplateType.WELCOME:
			fileName = 'welcome.ejs'
			break
		case TemplateType.REGISTER:
			fileName = 'register.ejs'
			break
		case TemplateType.RESET_PWD:
			fileName = 'reset-pwd.ejs'
			break
		case TemplateType.VALIDATE_ACCOUNT:
			fileName = 'validate-account.ejs'
			break
	}
	const result = await ejs.renderFile(path.join(__dirname, `/template/emails/${fileName}`), data, {})
	if(!result){
		Logger.error('[Render Email Template Error]:')
	}
	return result
}
/**
 * 发送邮件的统一动作
 * @param options 发送邮件所需的参数
*/
const send = (options: SendMailOptions) => {
	//? 追加统一的邮件动作
	options.from = process.env.GMAIL_ACCOUNT
	// 发送邮件
	transporter.sendMail(options, (error: Error | null, info) => {
		const msgContent = [
			'[Email Cotent]',
			options.to,
			options.subject,
			options.html,
			options.date
		].join('\n')
		if (error) {
			Logger.error('[Send Email Error]')
			Logger.error(error)
			Logger.error(msgContent)
		} else {
			Logger.debug('[Send Email Success]')
			Logger.info(info.response)
			Logger.error(msgContent)
		}
	});
}
/**
 * 发送注册获取验证码动作
*/
export const sendRegister = async (emailAccount: string) => {
	const html = await loadTemplateByType(TemplateType.REGISTER, { account: emailAccount })
	const options: SendMailOptions = {
		to: emailAccount,
		html,
	}
	send(options)
}
/**
 * 发送欢迎邮件
*/
export const sendWelcomeEmail = async (emailAccount: string) => {
	const html = await loadTemplateByType(TemplateType.WELCOME, { account: emailAccount })
	const options: SendMailOptions = {
		to: emailAccount,
		html,
	}
	send(options)
}

/**
 * 发送忘记密码-重置密码邮件
*/
export const sendResetPwdEmail = async (emailAccount: string) => {
	const html = await loadTemplateByType(TemplateType.RESET_PWD, { account: emailAccount })
	const options: SendMailOptions = {
		to: emailAccount,
		html,
	}
	send(options)
}

/**
 * 发送验证账号有效性的邮件
*/
export const sendRandomCodeEmail = async (emailAccount: string, code: string) => {
	const html = await loadTemplateByType(TemplateType.VALIDATE_ACCOUNT, {code})
	const options: SendMailOptions = {
		to: emailAccount,
		html,
	}
	send(options)
}