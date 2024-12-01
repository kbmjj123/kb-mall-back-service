import { AddressDTO } from "../dto/AddressDTO";
import { AddressModel } from "../models/AddressModel";
import { BaseService } from "./base/BaseService"

export class AddressService extends BaseService<AddressDTO> {
	constructor(){
		super(AddressModel)
	}
}