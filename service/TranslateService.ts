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
					//@ts-ignore
					doc[keyItem] = lastLanguageItem[keyItem] as string
					//@ts-ignore
					doc['language'] = lastLanguageItem['language'] as string
				})
			}
		}
		return doc
	}

	/**
	 * 根据业务id来更新对应的语言数据
	*/
	updateTranslates(id: Types.ObjectId | string, language: string, updates: any, languageKeyArray: string[]) {
		// 执行相关的更新操作
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

	/**
	 * 一次性获取批量翻译数据
	 * @param ids 待关联查询的业务id集合
	 * @param language 需要查询的语言
	 * @param languageKeyArray 对应缓存的key
	*/
	async getBatchTranslate(ids: Array<Types.ObjectId | string>, language: string, languageKeyArray: string[]): Promise<Map<string, any>> {
		// 根据ids进行批量查询操作
		const translations = await this.translateModel.find({
			businessId: { $in: ids },
			language
		}).exec()
		// 将查询到的list结果转换为map对象集合
		const translationMap = new Map();
		translations.forEach((translateItem: any) => {
			const id = translateItem.businessId.toString()
			// 提取所需的翻译字段
			const translatedData: Record<string, any> = {};
			languageKeyArray.forEach(key => {
				translatedData[key] = translateItem[key];
			});
			translationMap.set(id, translatedData)
		})
		return translationMap
	}

}