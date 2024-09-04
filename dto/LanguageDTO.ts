/**
 * 所有需要携带语言文档都必须继承于该接口，用于在Controller中进行直接调用
*/
export interface LanguageDTO {
	setLanguage(language: string): void;
}