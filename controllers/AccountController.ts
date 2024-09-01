import { Get, Path, Route, Tags, Request } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { UserModel } from "@/models/UserModel";
import { BaseObjectEntity } from "@/entity/BaseObjectEntity";
import { UserWithoutToken } from "@/dto/UserDTO";

@Route('account')
@Tags('账号模块')
export class AccountController extends BaseController{

	/**
	 * 根据id获取用户信息
	 * @param id 用户id
	*/
	@Get('{id}')
	public async getAUser(@Path() id: string, @Request() req: ExpressRequest): Promise<BaseObjectEntity<UserWithoutToken>> {
		if (id) {
			const findUser = await UserModel.findOne({ _id: id })
			if (!findUser) {
				return this.failedResponse(req, '用户不存在，请传递正确的id')
			} else {
				return this.successResponse(req, findUser, '操作成功')
			}
		} else {
			return this.failedResponse(req, '请传递有效的用户id')
		}
	}

}