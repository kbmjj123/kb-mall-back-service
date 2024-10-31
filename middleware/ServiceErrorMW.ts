import { Request, Response, NextFunction } from 'express'
import { errorLogger } from '../utils/Logger';

export default function (err: any, req: Request, res: Response, next: NextFunction) {
	errorLogger.error('[global error]')
	errorLogger.error(err?.message)
	errorLogger.error(err?.stack)
	const statusCode = 200 === res.statusCode ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		status: 0,
		message: err?.message,
		stack: err?.stack
	});
}