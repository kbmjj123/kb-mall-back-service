import { LogicResult } from '@/enum/http';
import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
	const error = new Error(`No Found: ${req.originalUrl}`);
	res.status(LogicResult.NO_FOUND);
	next(error);
}