import { TranslateService } from '@/service/TranslateService'
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
		// tService.getTranslate()
	})
	schema.post('find', function(doc, next) {
		// tService.updateTranslates()
		next()
	})
}