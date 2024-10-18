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
	 * 账号已注销
	*/
	USER_ALREADY_CANCELED = 100003,
	/**
	 * 登录超时
	*/
	LOGIN_TIMEOUT = 100999
}