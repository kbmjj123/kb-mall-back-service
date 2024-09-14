import { Types } from "mongoose";
import { ISoftDeleteDTO } from "../soft-delete-dto/ISoftDeleteDTO";

export interface TBaseDTO extends ISoftDeleteDTO{
	id: Types.ObjectId,
	businessId: Types.ObjectId,
	language: string,
}