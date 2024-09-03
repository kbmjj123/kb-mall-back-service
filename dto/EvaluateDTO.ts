import { Types } from "mongoose";

export interface EvaluateDto {
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