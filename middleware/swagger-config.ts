import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { Express } from 'express'

const swaggerDefinition = {
	openapi: '3.1.0',
	info: {
		title: 'KB商城接口文档',
		version: '1.0.0',
		description: 'KB商城买家、卖家端接口文档'
	},
	servers: [
		{
			url: 'http://localhost:3000'
		}
	]
}
const options = {
	swaggerDefinition,
	apis: ['./router/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)

export function setupSwagger(app: Express){
	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}
