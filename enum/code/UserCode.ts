/**
 * 用户模块-10开头
*/
export enum UserCode{
	/**
	 * 账号不存在
	*/
	USER_NO_EXIST = 10001,
	/**
	 * 账号或密码错误
	*/
	ACCOUNT_OR_PWD_ERROR = 10002,
	/**
	 * 旧密码错误
	*/
	ACCOUNT_OLD_PWD_ERROR = 10003,
	/**
	 * 账号已注销
	*/
	USER_ALREADY_CANCELED = 100004,
	/**
	 * 注册账号已存在
	*/
	USER_ALREADY_EXIST = 100005,
	/**
	 * 登录超时
	*/
	LOGIN_TIMEOUT = 100999
}