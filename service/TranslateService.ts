import { LanguageDTO } from '../dto/LanguageDTO';
import { infoLogger } from '../utils/Logger';
import { Model, Types } from 'mongoose'

export class TranslateService<T> {

	// 与业务collection关联的语言collection的model，用于语言doc的存取
	// @ts-ignore
	private translateModel: Model<T>;

	// @ts-ignore
	constructor(model: Model<T>) {
		this.translateModel = model
	}

	/**
	 * 根据业务id以及对应的目标语言来获取语言数据
	 * @param id 业务id
	 * @param language 当前所需要查询的语言
	 * @param doc 即将要被覆盖的对象
	*/
	async getTranslate(id: Types.ObjectId | string, language: string, doc: any, languageKeyArray: string[]) {
		// 执行相关的db查询操作
		infoLogger.info('获取对应语言model中对应语言的数据', language)
		const lastLanguageItem = await this.translateModel.findOne({ businessId: id, language }) as Document
		if(lastLanguageItem){
			// 找到对应的语言记录--> 覆盖原来文档中的对象
			if(languageKeyArray && languageKeyArray.length > 0){
				languageKeyArray.forEach(keyItem => {
					doc[keyItem] = lastLanguageItem[keyItem] as string
				})
			}
		}
		return doc
	}

	/**
	 * 根据业务id来更新对应的语言数据
	*/
	updateTranslates(id: Types.ObjectId | string, language: string, updates: any, languageKeyArray: string[]) {
		//TODO 执行相关的更新操作
		if (updates && updates.languageList) {
			const languageList = updates.languageList as Array<any>
			infoLogger.info(languageList)
			if (languageList.length > 0) {
				languageList.forEach(async languageItem => {
					if(languageKeyArray && languageKeyArray.length > 0){
						let languageObj: Record<string, string> = {}
						languageKeyArray.forEach(keyItem => {
							languageObj[keyItem] = languageItem[keyItem]
						})
						const cacheItem = await this.translateModel.findOne({ businessId: id })
						if(cacheItem){
							this.translateModel.findOneAndUpdate({ business: id }, {
								...languageObj,
								language: languageItem.language
							}, { returnDocument: 'after', new: true })
						}else{
							this.translateModel.create({
								...languageObj,
								language: languageItem.language,
								businessId: id
							})
						}
					}
				})
			}
		}
	}

}