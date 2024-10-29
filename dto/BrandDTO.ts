import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";
import { TBrandDTO } from "./translate-dto/TBrandDTO";

export interface BrandDTO extends ISoftDeleteDTO{
	/**
	 * id
	*/
	id: string,
	/**
	 * 品牌名称
	*/
	name: string,
	/**
	 * 品牌图标
	*/
	icon?: string,
	/**
	 * 当前所使用的语言
	*/
	language?: string,
	/**
	 * 额外的语言列表
	*/
	languageList?: Array<Partial<TBrandDTO>>,
}
/**
 * 发布品牌所需的参数定义--多语言支持
*/
export type EditBrandDTO = Partial<BrandDTO>
/**
 * 简版的品牌信息类型
*/
export type SingleBrandDTO = Pick<BrandDTO, 'id' | 'name' | 'icon'>