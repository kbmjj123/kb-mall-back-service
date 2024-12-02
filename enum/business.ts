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


/**
 * 用户状态
*/
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
/**
 * 购物车商品状态
*/
export enum CarItemState{
	/**
	 * 已失效
	*/
	IN_VALIDATE = 'in-validate',
	/**
	 * 正常状态
	*/
	NORMAL = 'normal',
}

/*************** 愿望清单相关 ****************/
export enum WishlistType {
	/**
	 * 共享清单
	*/
	SHARE = 'share',
	/**
	 * 私人清单
	*/
	PRIVACY = 'privacy'
}