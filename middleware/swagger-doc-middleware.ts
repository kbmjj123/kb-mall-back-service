import swaggerUI from 'swagger-ui-express'
import { Express, Request, Response } from 'express'

export function setupSwagger(app: Express){
	app.use('/api-docs', swaggerUI.serve, async (req: Request, res: Response) => {
		return res.send(swaggerUI.generateHTML(await import('../build/swagger.json')))
	})
}
