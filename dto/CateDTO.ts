import { Types } from "mongoose";
import { LanguageDTO } from "./LanguageDTO";

export interface CateDTO extends LanguageDTO{
	id: string;
	title: string;
	parentId?: Types.ObjectId | null | undefined;
	level: number | null | undefined;
	
}

export type EditCateDTO = Pick<CateDTO, 'title' | 'level'> & Partial<Pick<CateDTO, 'id'>>