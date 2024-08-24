import { Request, Response, NextFunction } from 'express'

export default function (err: any, req: Request, res: Response, next: NextFunction) {
	const statusCode = 200 === res.statusCode ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		status: 0,
		message: err?.message,
		stack: err?.stack
	});
}