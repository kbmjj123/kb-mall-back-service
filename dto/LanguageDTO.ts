/**
 * 所有需要携带语言文档都必须继承于该接口，用于在Controller中进行直接调用
*/

import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";

export type LanguageItemType = {
	language: string,
	languageMap: Record<string, any>	// 存储的key对应的语言
}

export interface LanguageDTO extends ISoftDeleteDTO{
	languageList: Array<LanguageItemType>;
}