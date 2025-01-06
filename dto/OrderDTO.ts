import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";

export interface OrderDTO extends ISoftDeleteDTO{
	
	amount: number,
	beneficAmount: number,
	payAmount: number,
	payTime: Date,
	cancelTime: Date,
	finishTime: Date,
	deliveryTime: Date,
	remark: string
}