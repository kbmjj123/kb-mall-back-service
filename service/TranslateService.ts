import { infoLogger } from '../utils/Logger';
import { Model, Types } from 'mongoose'

export class TranslateService<T> {

	// 与业务collection关联的语言collection的model，用于语言doc的存取
	// @ts-ignore
	private translateModel: Model<T>;

	// @ts-ignore
	constructor(model: Model<T>){
		this.translateModel = model
	}

	/**
	 * 根据业务id以及对应的目标语言来获取语言数据
	*/
	getTranslate(id: Types.ObjectId | string, language: string) {
		//TODO 执行相关的db查询操作
		infoLogger.info('获取对应语言model中对应语言的数据', language)
		// this.translateModel.find()
	}

	/**
	 * 根据业务id来更新对应的语言数据
	*/
	updateTranslates(id: Types.ObjectId | string, language: string, updates: any) {
		//TODO 执行相关的更新操作
		infoLogger.info('缓存翻译数据')
	}

}