import { OrderDTO } from "../dto/OrderDTO";
import { OrderModel } from "../models/OrderModel";
import { BaseService } from "./base/BaseService";

export class OrderService extends BaseService<OrderDTO>{

	constructor() {
		super(OrderModel)
	}
}