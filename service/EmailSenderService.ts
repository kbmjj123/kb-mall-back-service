import nodemailer, { SendMailOptions } from 'nodemailer'
import { infoLogger, errorLogger } from '../utils/Logger';
import path from 'path'
import ejs from 'ejs'
import TokenGenerator from '../config/TokenGenerator';
import { TFunction } from 'i18next'

// 创建一个 SMTP 传输实例
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		type: "OAuth2",
		user: process.env.GMAIL_ACCOUNT,
		clientId: process.env.GMAIL_CLIENT_ID,
		clientSecret: process.env.GMAIL_CLIENT_SECRET,
		refreshToken: process.env.GMAIL_REFRESH_TOKEN,
		accessToken: process.env.GMAIL_ACCESS_TOKEN
	},
	
});
transporter.addListener('error', (err: Error) => {
	errorLogger.error('[Send Email Error]')
	errorLogger.error(err)
})

enum TemplateType {
	WELCOME = 'welcome',
	REGISTER = 'register',
	RESET_PWD = 'reset-pwd',
	VALIDATE_ACCOUNT = 'validate-account'
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
	const result = await ejs.renderFile(path.join(__dirname, `../template/emails/${fileName}`), data, {})
	if (!result) {
		errorLogger.error('[Render Email Template Error]:')
	}
	return result
}
/**
 * 发送邮件的统一动作
 * @param options 发送邮件所需的参数
*/
const send = async (options: SendMailOptions) => {
	const msgContent = [
		'[Email Cotent]',
		options.to,
		options.subject,
		options.html,
		options.date
	].join('\n')
	//? 追加统一的邮件动作
	const result = await transporter.sendMail(options)
	console.info(result)
	if (result.response) {
		infoLogger.info('[Send Email Success]')
		infoLogger.info(result.response)
		infoLogger.info(msgContent)
	}
	return !!result.response
}
/**
 * 发送注册获取验证码动作
*/
export const sendRegister = async (emailAccount: string, t: TFunction) => {
	//? 生成验证用的token
	const token = TokenGenerator.generateValidateToken(emailAccount)
	const registerLink = `${process.env.REGISTER_LINK}?token=${token}&type=${TemplateType.REGISTER}`
	const html = await loadTemplateByType(TemplateType.REGISTER, { account: emailAccount, registerLink, t })
	infoLogger.info('即将生成的html内容为：' + html)
	const options: SendMailOptions = {
		to: emailAccount,
		subject: t('template.newRegisterSubject'),
		html,
	}
	return send(options)
}
/**
 * 发送欢迎邮件
*/
export const sendWelcomeEmail = async (emailAccount: string, t: TFunction) => {
	const mallLink = `${process.env.MALL_LINK}`
	const html = await loadTemplateByType(TemplateType.WELCOME, { account: emailAccount, mallLink })
	const options: SendMailOptions = {
		to: emailAccount,
		subject: t('template.registerSuccessSubject'),
		html,
	}
	return send(options)
}

/**
 * 发送忘记密码-重置密码邮件
*/
export const sendResetPwdEmail = async (emailAccount: string, t: TFunction) => {
	const token = TokenGenerator.generateValidateToken(emailAccount)
	const resetLink = `${process.env.RESET_PWD_LINK}?token=${token}&type=${TemplateType.RESET_PWD}`
	const html = await loadTemplateByType(TemplateType.RESET_PWD, { account: emailAccount, resetLink, t })
	const options: SendMailOptions = {
		to: emailAccount,
		subject: t('template.resetPwdSubject'),
		html,
	}
	return send(options)
}

/**
 * 发送验证账号有效性的邮件
*/
export const sendRandomCodeEmail = async (emailAccount: string, code: string, t: TFunction) => {
	const html = await loadTemplateByType(TemplateType.VALIDATE_ACCOUNT, { code })
	const options: SendMailOptions = {
		to: emailAccount,
		html,
	}
	return send(options)
}