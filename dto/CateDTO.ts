import { Types } from "mongoose";

export interface CateDTO {
	title: string;
	parentId: Types.ObjectId;
	level?: number | null | undefined;

}