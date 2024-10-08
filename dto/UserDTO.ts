import { Types } from "mongoose";

export interface UserDTO{
	
	/**
	 * 用户id
	*/
	id?: string;
	password: string;
	/**
	 * 用户邮箱
	 * @example "kbmjj123@gmail.com"
	*/
	email: string;
	/**
	 * 用户角色，枚举类型，user代表普通用户，admin代表管理员
	*/
	role: "user" | "admin";
	/**
	 * 刷新的token
	*/
	refreshToken?: string | null | undefined;
	/**
	 * 资源访问的token
	*/
	accessToken?: string | null | undefined;
	/**
	 * 用户昵称
	*/
	nickName?: string | null | undefined;
	/**
	 * 用户头像
	*/
	avatar?: string | null | undefined;
	/**
	 * 用户地址id
	*/
	address?: Types.ObjectId | null | undefined;
	/**
	 * 登录时间
	*/
	loginTime?: Date | null | undefined;
	/**
	 * 退出时间
	*/
	logoutTime?: Date | null | undefined;
	/**
	 * 用户账号
	*/
	account?: string | null | undefined;

	isPasswordMatched(newPwd: string): Promise<boolean>;
	
}

export type UserWithoutToken = Omit<UserDTO, 'password' | 'refreshToken' | 'accessToken' | 'logoutTime'>

export type EditUserParams = Pick<UserDTO, 'email' | 'account' | 'avatar' | 'nickName'>