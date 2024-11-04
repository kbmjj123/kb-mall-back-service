import { LanguageDTO, LanguageItemType } from "./LanguageDTO";


export interface BrandDTO extends LanguageDTO{
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
	icon: string,

}
/**
 * 发布品牌所需的参数定义--多语言支持
*/
export type EditBrandDTO = Pick<BrandDTO, 'name' | 'icon'> & Partial<Pick<BrandDTO, 'languageList'>>
/**
 * 简版的品牌信息类型
*/
export type SingleBrandDTO = Pick<BrandDTO, 'id' | 'name' | 'icon'>