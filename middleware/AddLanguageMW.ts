import { Request, Response, NextFunction } from "express" 

/**
 * 将req中的language属性追加在body或者是query中
*/
export const appendLanguage = (req: Request, res: Response, next: NextFunction) => {
	if(req.method === 'get'){
		// get请求的是将这个req.language怼到query查询中
		if(!req.query){
			req.query = {}
		}
		req.query.language = req.language
	}else{
		// 非get请求则是怼到body中
		req.body.language = req.language
	}
	next()
}