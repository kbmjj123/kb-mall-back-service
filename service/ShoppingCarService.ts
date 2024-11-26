import { CarDTO } from "../dto/CarDTO";
import { ShoppingCarModel } from "../models/ShoppingCarModel";
import { BaseService } from "./base/BaseService";

export class ShoppingCarService extends BaseService<CarDTO>{
	constructor(){
		super(ShoppingCarModel)
	}
}