/*************** 用户相关 ****************/
export enum UserRole{
	/**
	 * 普通用户
	*/
	USER = "user",
	/**
	 * 管理员角色
	*/
	ADMIN = "admin"
}

export enum AccountState{
	/**
	 * 启用中
	*/
	IN_USED = 'in-used',
	/**
	 * 禁用中
	*/
	FORBIDDEN = 'forbidden'
}

/*************** 邮箱验证码相关 ****************/
/**
 * 生成的code类型
*/
export enum CodeType {
	/**
	 * 注册
	*/
	REGISTER = 'register',
	/**
	 * 重置密码
	 */
	RETSET_PWD = 'reset-pwd'
}

/*************** 产品相关 ****************/
export enum ProductState{
	/**
	 * 上架中
	*/
	ON_LINE = 'on-line',
	/**
	 * 下架中
	*/
	OFF_LINE = 'off-line'
}