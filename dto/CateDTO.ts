import { Types } from "mongoose";
import { LanguageDTO } from "./LanguageDTO";

export interface CateDTO extends LanguageDTO{
	id?: string;
	title: string;
	parentId?: Types.ObjectId;
	level?: number;
	
}
/**
 * 新增/编辑分类的参数
*/
export type EditCateDTO = Pick<CateDTO, 'title' | 'level' | 'parentId'> & Partial<Pick<CateDTO, 'id'>>

/**
 * 分类属性
*/
export interface CateParamsDTO extends CateDTO{
	/**
	 * 分类属性列表
	*/
	params: string[]
}