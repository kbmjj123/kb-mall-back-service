import { UserDTO } from "@/dto/UserDTO";
import { BaseService } from "./base/BaseService";
import { Request as ExpressRequest } from "express";
import { UserModel } from "@/models/UserModel";

export class UserService extends BaseService<UserDTO> {
	private req: ExpressRequest

	constructor(req: ExpressRequest) {
		super(UserModel)
		this.req = req
	}

	/**
	 * 根据查询条件判断用户是否存在
	 * @param email 用户邮箱账号
	 */
	isExist(email: string): Promise<UserDTO | null> {
		return this.findOne({email}, this.req)
	}

	

}