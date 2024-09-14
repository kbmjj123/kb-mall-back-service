import { Types } from "mongoose";
import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";

export interface EvaluateDto extends ISoftDeleteDTO{
	userId: Types.ObjectId;
	userNick: string;
	productId: Types.ObjectId;
	score: number;
	title: string;
	content: string;
	evaluateTime?: Date | null | undefined;
	userAvatar?: string | null | undefined;
	pictures?: string[] | null | undefined;

}