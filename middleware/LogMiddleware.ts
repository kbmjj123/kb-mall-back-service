import morgan, { TokenIndexer } from 'morgan';//友好输出请求日志信息
import { Express, Request, Response } from 'express'
import { infoLogger } from '@/utils/Logger';

export const loggerWrap = (app: Express) => {
	app.use(morgan((tokens: TokenIndexer<Request, Response>, req: Request, res: Response) => {
		return [
			`[Request Begin]:`,
			`Request URL: ${tokens.url(req, res)}`,
			`Method: ${tokens.method(req, res)}`,
			`Body: ${JSON.stringify(req.body)}`,
			`Params: ${JSON.stringify(req.params)}`,
			`Query: ${JSON.stringify(req.query)}`,
			`Status: ${tokens.status(req, res)}`,
			`Response Time: ${tokens['response-time'](req, res)}ms`,
			`Content Length: ${tokens.res(req, res, 'content-length')}`,
			`User-Agent: ${req.headers['user-agent']}`,
			`Client IP: ${req.clientIp}`
		].join('\n')
	}, {
		stream: {
			write(message: string) {
				infoLogger.info(message)
			}
		}
	}))
}