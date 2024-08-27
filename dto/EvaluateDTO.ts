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
	pictures?: { prototype: Types.DocumentArray<any> | unknown[] | Types.DocumentArray<{ [x: string]: unknown; }> | unknown[];[Symbol.species]: any[]; isArray?: {} | null | undefined; from?: {} | null | undefined; of?: {} | null | undefined; } | null | undefined;

}