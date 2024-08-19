declare namespace NodeJS {
	interface ProcessEnv {
		SERVICE_PORT: number,				// 服务端口
		MONGODB_URL: string,				// mongodb的地址
		BCRYPT_SALT: number,				// 密码加盐的长度
		JWT_ACCESS_SECRET: string,	// JWT的密钥
		JWT_ACCESS_EXPIRES_IN_TIME: number,	// 过期时长
		JWT_REFRESH_SECRET: string,	// 刷新token的相关配置
		JWT_REFRESH_EXPIRES_IN_TIME: number
	}
}
