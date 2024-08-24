import swaggerUI from 'swagger-ui-express'
import express, { Express, Request, Response } from 'express'

export function setupSwagger(app: Express){
	// app.use('/api-docs', swaggerUI.serve, async (req: Request, res: Response) => {
	// 	return res.send(swaggerUI.generateHTML(await import('../build/swagger.json')))
	// })
	//https://chatgpt.com/c/de947758-a376-43f7-90d0-fb2a8b6f4dbe
	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(undefined, {
		swaggerUrl: '../swagger.json',
		swaggerOptions: {
			requestInterceptor: (req: Request) => {
				req.headers['authorization'] = 'Bearer xxx'
				return req
			}
		}
	}))
	app.use(express.static('build'))
}
