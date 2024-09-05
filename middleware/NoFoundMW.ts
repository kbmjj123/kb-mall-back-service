import { LogicResult } from '@/enum/http';
import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
	const error = new Error(req.t('tip.noFoundError', { originalUrl: req.originalUrl }));
	res.status(LogicResult.NO_FOUND);
	next(error);
}