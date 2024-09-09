import express, { Express, Request, Response, NextFunction } from "express"
import path from "path"

/**
 * 调试邮件模版的中间件
*/
export const setUpEmailTemplateDebugger = (app: Express) => {
	if (process.env.PREVIEW_EMAIL_TEMPLATE) {
		app.set('view engine', 'ejs')
		app.set('views', path.join(__dirname, '../template'))
		const templateRouter = express.Router()
		templateRouter.get('/validate-account', (req: Request, res: Response, next: NextFunction) => {
			const data = { t: req.t, account: '柯比', code: '888888' }
			res.render('emails/validate-account', data)
		})
		templateRouter.get('/reset-pwd', (req: Request, res: Response, next: NextFunction) => {
			const data = { t: req.t }
			res.render('emails/reset-pwd', data)
		})
		templateRouter.get('/register', (req: Request, res: Response, next: NextFunction) => {
			const data = { t: req.t, account: '柯比' }
			res.render('emails/register', data)
		})
		app.use('/emailPreview', templateRouter)
	}
}