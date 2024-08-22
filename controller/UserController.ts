import { UserDTO } from "@/dto/UserDTO";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { Tags, Route, Request, Path, Get, Post, Put, Delete } from 'tsoa'
import { BaseObjectEntity } from "@/entity/BaseObjectEntity";

@Route('users')
export class UserController extends BaseController {
	/**
	 * 根据id获取用户信息
	 * @param id 用户id
	*/
	@Get('{id}')
	public async getAUser(@Path() id: string, @Request() req: ExpressRequest): Promise<BaseObjectEntity<UserDTO>> {
		return this.successResponse(req, new UserDTO())
	}

}