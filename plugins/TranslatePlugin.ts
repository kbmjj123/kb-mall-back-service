import { TranslateService } from '@/service/TranslateService'
import Logger from '@/utils/Logger'
import { Schema, Model } from 'mongoose'

export type TranslatePluginOptions = {
	modelName: string,
	model: any,
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
	schema.pre('save', function(docs) {
		//TODO 这里需要将相关的翻译数据通过service来缓存到对应的collection中
		// tService.getTranslate()
		Logger.debug(docs)
	})
	schema.post('find', function(doc, next) {
		//TODO 这里将通过service自动从对应的collection中获取到对应的翻译数据
		// tService.updateTranslates()
		next()
	})
}