import { UserDTO } from "../dto/UserDTO";
import { BaseService } from "./base/BaseService";
import { UserModel } from "../models/UserModel";
import { RANDOM_USER_AVATAR_HOST } from "../config/ConstantValues";
import { Document } from "mongoose";

export class UserService extends BaseService<UserDTO> {

	constructor() {
		super(UserModel)
	}
	
	/**
	 * 根据用户邮箱生成用户唯一的头像png图片
	*/
	generateUniqueAvatar(email: string){
		const account = email.substring(0, email.indexOf('@'))
		return `${RANDOM_USER_AVATAR_HOST}${account}.png`
	}


}