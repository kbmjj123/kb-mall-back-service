import { TranslateService } from '../service/TranslateService'
import { infoLogger } from '../utils/Logger'
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
	//! 为需要翻译服务的schema对应的model添加setLanguage方法，将req中的language字段追加到model中
	schema.method('setLanguage', function(language: string) {
		let doc = this as any
		doc.language = language;
	})
	//? 这里将其定义为save之后，是因为如果是新增的话，需要拿到对应的businessId来进行对应的语言collection赋值
	schema.post('save', function(doc) {
		//? 拿到doc中的language
		const language = doc.language as string
		const cachedLanguageKeys = cachedModelKeys[options.modelName]	// 获取注册插件时所定义的需要缓存的key对象
		tService.updateTranslates(doc._id as string, language, doc, cachedLanguageKeys)
	})
	schema.post(['find', 'findOne', 'findOneAndUpdate'], async function(doc) {
		const query = this as any
		console.info(query.options)
		//? 拿到req中的language
		const language = query.language
		infoLogger.info('--->' + language)
		//TODO 这里将通过service自动从对应的collection中获取到对应的翻译数据，然后追加覆盖到当前的对象类型中
		const cachedLanguageKeys = cachedModelKeys[options.modelName]	// 获取注册插件时所定义的需要缓存的key对象
		if(Array.isArray(doc)){
			// 查询出来的是列表，则自动覆盖显耀覆盖的字段
			doc.forEach(async docItem => {
				docItem = await tService.getTranslate(docItem.id, language, docItem, cachedLanguageKeys)
			})
		}else{
			// 查询出来的是对象，则直接覆盖其属性
			doc = await tService.getTranslate(doc.id, language, doc, cachedLanguageKeys)
		}
	})
}