import { Model, Types } from 'mongoose'

export class TranslateService<T> {

	private translateModel: Model<T>;

	constructor(model: Model<T>){
		this.translateModel = model
	}

	/**
	 * 根据业务id以及对应的目标语言来获取语言数据
	*/
	getTranslate(id: Types.ObjectId, language: string) {
		//TODO 执行相关的db查询操作
		// this.translateModel.find()
	}

	/**
	 * 根据业务id来更新对应的语言数据
	*/
	updateTranslates(id: Types.ObjectId, language: string, updates: any) {
		//TODO 执行相关的更新操作
	}

}