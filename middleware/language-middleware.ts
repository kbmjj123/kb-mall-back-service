import { Express } from 'express'
import i18next from 'i18next'
import languageMW from 'i18next-http-middleware'

export default function(app: Express) {
	i18next.use(languageMW.LanguageDetector).init({
		debug: true,
		preload: ['en', 'zh-CN', 'zh-TW'],
		fallbackLng: 'en'
	})
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