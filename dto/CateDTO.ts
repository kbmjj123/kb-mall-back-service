import { Types } from "mongoose";
import { LanguageDTO } from "./LanguageDTO";

export interface CateDTO extends LanguageDTO{
	id: string;
	title: string;
	parentId?: Types.ObjectId;
	level?: number;
	
}

export type EditCateDTO = Pick<CateDTO, 'title' | 'level' | 'parentId'> & Partial<Pick<CateDTO, 'id'>>