import { Express } from 'express'
import userRouter from './user-router'
import commonRouter from './common-router'
import fileUploadRouter from './file-upload-router'
import productRouter from './product-router'
import orderRouter from './order-router'
import resourcesRouter from './resources-router'

export default function (app: Express) {
	app.use('/', commonRouter);
	app.use('/users', userRouter);
	app.use('/files', fileUploadRouter);
	app.use('/products', productRouter);
	app.use('/orders', orderRouter);
	app.use('/resources', resourcesRouter);
}