import { Route, Tags, Request, Body, Get, Post, Delete, Put, Path, Queries } from "tsoa";
import { Request as ExpressRequest } from 'express'
import { BaseController } from "./BaseController";
import { BasePageListEntity } from "../entity/BasePageListEntity";
import { AddressDTO } from "../dto/AddressDTO";
import { PageDTO } from "../dto/PageDTO";
import { AddressModel } from "../models/AddressModel";
import { BaseObjectEntity } from "../entity/BaseObjectEntity";

@Route('address')
@Tags('地址模块')
export class AddressController extends BaseController{

	/**
	 * 获取用户地址列表
	*/
	@Get('list')
	public async getAddressList(@Request() req: ExpressRequest, @Queries() params: PageDTO): Promise<BasePageListEntity<AddressDTO>> {
		return this.successListResponse(req, {
			list: [],
			total: 0,
			pageSize: Number(20),
			pageIndex: Number(0 + 1),
			pages: 0
		})
	}

	/**
	 * 新增一用户地址
	*/
	@Put()
	public async createAddress(){

	}

	/**
	 * 编辑用户地址
	*/
	@Post('{id}')
	public async modifyAddress(@Request() req: ExpressRequest, @Path() id: string, @Body() params: AddressDTO) {

	}

	/**
	 * 删除一用户地址
	*/
	@Delete('{id}')
	public async DeleteAddress(@Request() req: ExpressRequest, @Path() id: string) {}

	/**
	 * 设置用户默认的收货地址
	*/
	@Post('{id}/default')
	public async setDefaultAddress(@Request() req: ExpressRequest, @Path() id: string) {

	}
	
	/**
	 * 根据用户id获取用户地址信息
	*/
	@Get('{id}')
	public async getAddressInfo(@Request() req: ExpressRequest, @Path() id: string) {

	}

}