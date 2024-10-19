import { UserDTO } from "../dto/UserDTO";
import { BaseService } from "./base/BaseService";
import { Request as ExpressRequest } from "express";
import { UserModel } from "../models/UserModel";
import { RANDOM_USER_AVATAR_HOST } from "../config/ConstantValues";

export class UserService extends BaseService<UserDTO> {
	private req: ExpressRequest

	constructor(req: ExpressRequest) {
		super(UserModel)
		this.req = req
	}
	
	/**
	 * 根据用户邮箱生成用户唯一的头像png图片
	*/
	generateUniqueAvatar(email: string){
		const account = email.substring(0, email.indexOf('@'))
		return `${RANDOM_USER_AVATAR_HOST}${account}.png`
	}

}