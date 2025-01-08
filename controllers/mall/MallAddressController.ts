import { Middlewares, Request,  Queries, Route, Tags, Get, Body, Put, Post, Path, Delete, Patch } from "tsoa";
import { BaseController } from "../BaseController";
import { checkLogin } from "../../middleware/AuthMiddleware";
import { Request as ExpressRequest } from 'express'
import { PageDTO } from "../../dto/PageDTO";
import { AddressDTO } from "../../dto/AddressDTO";
import { ResultCode } from "../../enum/http";
import { UserService } from "../../service/UserService";
import mongoose from "mongoose";
import { errorLogger } from "../../utils/Logger";
import { body } from "express-validator";
import ParamsValidateMW from "../../middleware/ParamsValidateMW";

/**
 * 地址字段校验
 */
const validateAddressMW = [
	body('fullName').notEmpty(),
	body('phone').notEmpty().isMobilePhone('any'),
	body('email').notEmpty().isEmail(),
	body('country').notEmpty(),
	body('state').notEmpty(),
	body('city').notEmpty(),
	body('district').notEmpty(),
	body('streetAddressLine1').notEmpty(),
	body('isDefault').isBoolean(),
	ParamsValidateMW
]

@Route('/api/address')
@Tags('商城/用户收货地址模块')
@Middlewares([checkLogin])
export class MallAddressController extends BaseController{

	private userService : UserService
	constructor(){
		super()
		this.userService = new UserService()
	}

	/**
	 * 获取当前登录用户的收获地址列表
	*/
	// @Get('/list')
	// public async getAddressList(@Request() req: ExpressRequest, @Queries() params: PageDTO) {
	// 	const { id: userId } = req.user
	// 	const addressList = await this.addressService.findList({ userId }, req, params)
	// 	return this.successPageListResponse(req, addressList)
	// }

	/**
	 * 新增一用户售后地址
	*/
	@Put('/add')
	@Middlewares([validateAddressMW])
	public async addAddress(@Request() req: ExpressRequest, @Body() params: AddressDTO) {
		const { id: userId } = req.user
		const result = await this.userService.addItemToListInObj<AddressDTO>(userId, {
			addressList: params
		})
		if(result){
			return this.successResponse(req, result)
		}else{
			return this.failedResponse(req)
		}
	}
	/**
	 * 编辑用户地址信息
	 * @param params 
	*/
	// @Post('/${id}/edit')
	// public async editAddress(@Request() req: ExpressRequest, @Path() id: string, @Body() params: AddressDTO){
	// 	const updateAAddress = await this.addressService.update(id, params, req)
	// 	if(updateAAddress){
	// 		return this.successResponse(req, updateAAddress)
	// 	}else{
	// 		return this.failedResponse(req)
	// 	}
	// }
	/**
	 * 根据地址id查询地址信息
	 * @param id 待查询的地址id
	 */
	// @Get('/${id}')
	// public async getAddressInfo(@Request() req: ExpressRequest, @Path() id: string) {
	// 	const findAAddress = await this.addressService.findById(id, req)
	// 	if(findAAddress){
	// 		return this.successResponse(req, findAAddress)
	// 	}else{
	// 		return this.failedResponse(req, req.t('tip.noExistError'), ResultCode.NO_FOUND)
	// 	}
	// }
	/**
	 * 根据地址id删除一收货地址
	*/
	// @Delete('/${id}')
	// public async removeById(@Request() req: ExpressRequest, @Path() id: string){
	// 	const deleteAAddress = await this.addressService.sofeDeleteById(id, req)
	// 	if(deleteAAddress){
	// 		return this.successResponse(req, !!deleteAAddress)
	// 	}else{
	// 		return this.failedResponse(req)
	// 	}
	// }

	/**
	 * 设置默认的收货地址
	*/
	// @Patch('/${id}/setDefault')
	// public async setDefaultAddress(@Request() req: ExpressRequest, @Path() id: string){
	// 	const { id: userId } = req.user
	// 	const myAddress = await this.addressService.findOne({userId, _id: id}, req)
	// 	if(!myAddress){
	// 		return this.failedResponse(req, req.t('tip.noExistError'), ResultCode.NO_FOUND)
	// 	}
	// 	const session = await mongoose.startSession()
	// 	session.startTransaction()
	// 	try{
	// 		// 将非目标id给设置isDefault为false
	// 		await this.addressService.updateMany({
	// 			userId,
	// 		}, { isDefault: false }, req, { session })
	// 		const setADefaultAddress = await this.addressService.update(id, {
	// 			isDefault: true,
	// 		}, req, { session })
	// 		await session.commitTransaction()
	// 		session.endSession()
	// 		if(setADefaultAddress){
	// 			return this.successResponse(req, setADefaultAddress)
	// 		}else{
	// 			return this.failedResponse(req)
	// 		}
	// 	}catch(error){
	// 		await session.abortTransaction()
	// 		session.endSession()
	// 		errorLogger.error(`[setDefaultAddress]异常`)
	// 		errorLogger.error(error)
	// 		throw new Error(`数据库setDefaultAddress操作异常`)
	// 	}
	// }

}