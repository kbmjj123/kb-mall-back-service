/**
 * 所有需要携带语言文档都必须继承于该接口，用于在Controller中进行直接调用
*/

type LanguageItemType = {
	language: string,
	keyLanguageMap: Record<string, any>	// 存储的key对应的语言
}

export interface LanguageDTO {
	setLanguage(language: string): void;
	languageList?: LanguageItemType[];
}