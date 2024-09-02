import { Types } from "mongoose";

export interface IBaseDTO {
	id: Types.ObjectId,
	businessId: Types.ObjectId,
	language: string,
	
}