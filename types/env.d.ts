declare namespace NodeJS {
	interface ProcessEnv {
		SERVICE_PORT: number,				// 服务端口
		MONGODB_URL: string,				// mongodb的地址
		BCRYPT_SALT: number,				// 密码加盐的长度
		JWT_ACCESS_SECRET: string,	// JWT的密钥
		JWT_ACCESS_EXPIRES_IN_TIME: number,	// 过期时长
		JWT_REFRESH_SECRET: string,	// 刷新token的相关配置
		JWT_REFRESH_EXPIRES_IN_TIME: number,
		PREVIEW_EMAIL_TEMPLATE: boolean,	// 是否开启预览邮件模版的标识
		GMAIL_ACCOUNT: string,			// 用来发送邮件的邮箱账号
		GMAIL_PASSWORD: string,			// 用来发送邮件的邮箱密码
		REGISTER_LINK: string,			// 注册用的链接地址
		RESET_PWD_LINK: string,			// 重置密码用的链接地址
	}
}
