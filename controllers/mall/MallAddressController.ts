import { Middlewares, Request, Queries, Route, Tags, Get, Body, Put, Post, Path, Delete, Patch } from "tsoa";
import { BaseController } from "../BaseController";
import { checkLogin } from "../../middleware/AuthMiddleware";
import { Request as ExpressRequest } from 'express'
import { AddressDTO } from "../../dto/AddressDTO";
import { ResultCode } from "../../enum/http";
import { UserService } from "../../service/UserService";
import mongoose from "mongoose";
import { body } from "express-validator";
import ParamsValidateMW from "../../middleware/ParamsValidateMW";
import { BaseObjectEntity } from "../../entity/BaseObjectEntity";

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
export class MallAddressController extends BaseController {

	private userService: UserService
	constructor() {
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
	public async addAddress(@Request() req: ExpressRequest, @Body() params: AddressDTO): Promise<BaseObjectEntity<AddressDTO>> {
		const { id: userId } = req.user
		const result = await this.userService.update(userId, {
			$push: {
				addressList: params
			}
		}, req)
		if (result) {
			const addressList = this.userService.toDTO(result).addressList as AddressDTO[]
			return this.successResponse(req, addressList[addressList.length - 1])
		} else {
			return this.failedResponse(req)
		}
	}
	/**
	 * 编辑用户地址信息
	 * @param params 
	*/
	@Post('/${id}/edit')
	public async editAddress(@Request() req: ExpressRequest, @Path() id: string, @Body() params: AddressDTO): Promise<BaseObjectEntity<boolean>> {
		const { id: userId } = req.user
		const { id: addressId, ...updateAddress } = params
		const result = await this.userService.findOneAndUpdate(req, {
			_id: userId,
			'addressList.id': addressId
		}, {
			$set: {
				'addressList.$': updateAddress
			}
		})
		if(result){
			return this.successResponse(req, !!result)
		}else{
			return this.failedResponse(req)
		}
	}
	/**
	 * 根据地址id查询地址信息
	 * @param id 待查询的地址id
	 */
	@Get('/${id}')
	public async getAddressInfo(@Request() req: ExpressRequest, @Path() id: string): Promise<BaseObjectEntity<AddressDTO>> {
		const { id: userId } = req.user
		const result = await this.userService.findOne({
			_id: userId,
			addressList: { $elemMatch: { id: new mongoose.Types.ObjectId(id) } }
		}, req)
		const findAAddress = result?.addressList[0]
		if(findAAddress){
			return this.successResponse(req, findAAddress)
		}else{
			return this.failedResponse(req, req.t('tip.noExistError'), ResultCode.NO_FOUND)
		}
	}
	/**
	 * 根据地址id删除一收货地址
	*/
	@Delete('/${id}')
	public async removeById(@Request() req: ExpressRequest, @Path() id: string){
		const { id: userId } = req.user
		const result = await this.userService.findOneAndUpdate(req, {
			_id: userId,
		}, {
			$pull: {
				addressList: {
					id: new mongoose.Types.ObjectId(id)
				}
			}
		})
		if(result){
			return this.successResponse(req, !!result)
		}else{
			return this.failedResponse(req)
		}
	}

	/**
	 * 设置默认的收货地址
	*/
	@Patch('/${id}/setDefault')
	public async setDefaultAddress(@Request() req: ExpressRequest, @Path() id: string){
		const { id: userId } = req.user
		const result = await this.userService.findOneAndUpdate(req, {
			_id: userId,
			'addressList.id': id
		}, [
			{
				$set: {
					'addressList.$[].isDefault': false
				},
			},
			{
				$set: {
					'addressList.$[elem].isDefault': true
				}
			},
		], {
			arrayFilters: [{ 'elem.id': id }],
			new: true
		})
		
	}

}