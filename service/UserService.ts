import { UserDTO } from "@/dto/UserDTO";
import { BaseService } from "./base/BaseService";
import { Request as ExpressRequest } from "express";
import { UserModel } from "@/models/UserModel";
import { FilterQuery } from "mongoose";

export class UserService extends BaseService<UserDTO> {
	private req: ExpressRequest

	constructor(req: ExpressRequest) {
		super(UserModel)
		this.req = req
	}


}