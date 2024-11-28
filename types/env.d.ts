declare namespace NodeJS {
	interface ProcessEnv {
		SERVICE_PORT: number,				// 服务端口
		MONGODB_URL: string,				// mongodb的地址
		BCRYPT_SALT: number,				// 密码加盐的长度
		JWT_ACCESS_SECRET: string,	// JWT的密钥
		JWT_ACCESS_EXPIRES_IN_TIME: number,	// 过期时长
		JWT_REFRESH_SECRET: string,	// 刷新token的相关配置
		JWT_REFRESH_EXPIRES_IN_TIME: number,
		JWT_WISHLIST_SECRET: string,// 愿望清单的密钥
		JWT_WISHLIST_EXPIRES_IN_TIME: number,// 愿望清单的过期时长
		PREVIEW_EMAIL_TEMPLATE: boolean,	// 是否开启预览邮件模版的标识
		GMAIL_ACCOUNT: string,			// 用来发送邮件的邮箱账号
		GMAIL_CLIENT_ID: string,		// 用来发送邮件的clientID
		GMAIL_CLIENT_SECRET: string,// 用来发送邮件的clientSecret
		GMAIL_REFRESH_TOKEN: string,// 用来发送邮件的刷新token
		GMAIL_ACCESS_TOKEN: string,	// 用来发送邮件的访问token
		MALL_LINK: string,					// 商城的链接地址
		REGISTER_LINK: string,			// 注册用的链接地址
		RESET_PWD_LINK: string,			// 重置密码用的链接地址
		SHARE_WISHLIST_LINK: string,// 分享的愿望清单链接地址
		UPLOAD_FILE_SIZE: number,		// 上传文件大小限制，默认限制为10m
		SKIP_SENDING_EMAIL: boolean,	// 是否跳过邮箱发送操作
		QQ_EMAIL_ACCOUNT: string,		// 用来发送邮件的QQ邮箱
		QQ_EMAIL_AUTH_CODE: string,	// 用来发送邮件的QQ邮箱授权码
		QQ_FULL_EMAIL_ACCOUNT: string,// 完整的QQ邮箱账号
	}
}
