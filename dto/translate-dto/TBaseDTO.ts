import { Types } from "mongoose";

export interface TBaseDTO {
	id: Types.ObjectId,
	businessId: Types.ObjectId,
	language: string,
	
}