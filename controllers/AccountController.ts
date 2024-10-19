import { Get, Path, Route, Tags, Request, Queries } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { BaseObjectEntity } from "../entity/BaseObjectEntity";
import { UserWithoutToken } from "../dto/UserDTO";
import { UserService } from "../service/UserService";
import { PageDTO } from "../dto/PageDTO";

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
			const userService = new UserService(req)
			const findUser = await userService.findById(id, req)
			if (!findUser) {
				return this.failedResponse(req, '用户不存在，请传递正确的id')
			} else {
				return this.successResponse(req, findUser, '操作成功')
			}
		} else {
			return this.failedResponse(req, '请传递有效的用户id')
		}
	}

	/**
	 * 获取用户列表
	 */
	@Get('/list')
	public async getUserList(@Request() req: ExpressRequest, @Queries() query: PageDTO) {
		let { keyword, pageIndex = 1, pageSize = 20 } = query
		pageIndex = pageIndex as number - 1
		pageSize = Number(pageSize)
		let searchList = []
		let total = 0
		
	}

}