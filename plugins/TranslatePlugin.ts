import { TranslateService } from '@/service/TranslateService'
import { infoLogger } from '@/utils/Logger'
import { Schema, Model } from 'mongoose'

/**
 * 翻译插件的自定义参数
*/
export type TranslatePluginOptions = {
	/**
	 * 当前的模型名称，用于获取当前业务模型所需要翻译的keys
	*/
	modelName: string,
	model: any,
	/**
	 * modalName模型对应需要翻译的字段key名称集合
	*/
	keysInCollection: string[],
	translateModel?: string
}
// 缓存的collection与需要翻译的key的映射关系
const cachedModelKeys: Record<string, string[]> = {}

/**
 * 可按需调用的翻译插件
*/
export const TranslatePlugin = (schema: Schema, options: TranslatePluginOptions) => {
	// 获取调用插件时传递的model类型
	type ServiceType = typeof options.model
	// 在collection注册好插件时，也就创建好了对应的翻译服务
	const tService: TranslateService<ServiceType> = new TranslateService(options.model)
	cachedModelKeys[options.modelName] = options.keysInCollection
	schema.method('setLanguage', function(language: string) {
		let doc = this as any
		doc.language = language;
	})
	schema.pre('save', function(next) {
		console.info(this)
		const doc = this as any
		//? 拿到req中的language
		const language = doc.language
		infoLogger.info('--->' + language + '<---')
		// tService.updateTranslates()
		infoLogger.info('这里将在保存动作自动追加翻译数据到翻译表中')
		next()
	})
	schema.post(['find', 'findOne', 'findOneAndUpdate'], function(doc, next) {
		console.info(doc)
		const query = this as any
		console.info(query.options)
		//? 拿到req中的language
		const language = query.language
		infoLogger.info('--->' + language)
		//TODO 这里将通过service自动从对应的collection中获取到对应的翻译数据
		// tService.getTranslate(doc.id, language)
		infoLogger.info('这里将自动追加上翻译信息')
		next()
	})
}