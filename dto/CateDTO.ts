import { Types } from "mongoose";
import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";

export interface CateDTO extends ISoftDeleteDTO{
	title: string;
	parentId: Types.ObjectId;
	level?: number | null | undefined;

}