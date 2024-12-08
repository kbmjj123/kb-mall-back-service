import { Get, Path, Route, Tags, Request, Queries, Post, Query, Body } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { BaseObjectEntity } from "../entity/BaseObjectEntity";
import { UserDTO, UserToggleEnabledParams, UserWithoutToken } from "../dto/UserDTO";
import { UserService } from "../service/UserService";
import { PageDTO } from "../dto/PageDTO";
import { BasePageListEntity } from "../entity/BasePageListEntity";

@Route('account')
@Tags('账号模块')
export class AccountController extends BaseController{

	private userService: UserService

	constructor() {
		super()
		this.userService = new UserService()
	}

	/**
	 * 获取用户列表
	 */
	@Get('/list')
	public async getUserList(@Request() req: ExpressRequest, @Queries() query: PageDTO): Promise<BasePageListEntity<UserDTO>> {
		const result = await this.userService.findListInPage('account', query, ['createTime'])
		return this.successPageListResponse(req, result)
	}

	/**
	 * 根据id获取用户信息
	 * @param id 用户id
	*/
	@Get('/info/{id}')
	public async getAUser(@Request() req: ExpressRequest, @Path() id: string): Promise<BaseObjectEntity<UserWithoutToken>> {
		if (id) {
			const findUser = await this.userService.findById(id, req)
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
	 * 启用/禁用一账号
	*/
	@Post('/{id}/toggleAccountState')
	public async toggleAccountState(@Request() req: ExpressRequest, @Path() id: string, @Body() params: UserToggleEnabledParams): Promise<BaseObjectEntity<UserDTO>>{
		if(id){
			const findAnAccount = await this.userService.findById(id, req)
			if(findAnAccount){
				const { state } = params
				const updateAnAccount = await this.userService.update(id, { state }, req)
				if(updateAnAccount){
					return this.successResponse(req, updateAnAccount)
				}else{
					return this.failedResponse(req)
				}
			}else{
				return this.failedResponse(req, req.t('account.idBelogAccountNoExist'))
			}
		}else{
			return this.failedResponse(req, req.t('account.idNeed'))
		}
	}

}