import Logger from '@/utils/Logger'
import { Express } from 'express'
import i18next from 'i18next'
import languageMW from 'i18next-http-middleware'

export default function(app: Express) {
	// languageMW.LanguageDetector是一个语言检测器，主要用于从req中监测到对应的语言
	i18next.use(languageMW.LanguageDetector).init({
		debug: true,
		preload: ['en', 'zh-CN', 'zh-TW'],
		fallbackLng: 'en'
	}, () => {
		//! 加载成功
		Logger.debug('语言加载成功')
	})
	// 这里的handle最终也是返回一个中间件函数:(req, res, next) => {}
	app.use(languageMW.handle(i18next))
}
/* 在中间件中的使用
app.get('myRoute', (req, res) => {
  var lng = req.language // 'de-CH'
  var lngs = req.languages // ['de-CH', 'de', 'en']
  req.i18n.changeLanguage('en') // will not load that!!! assert it was preloaded
  var exists = req.i18n.exists('myKey')
  var translation = req.t('myKey')
})
*/