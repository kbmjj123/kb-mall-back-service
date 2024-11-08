import { Get, Middlewares, Request, Route, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { checkLogin } from "../middleware/AuthMiddleware";
import { Request as ExpressRequest } from "express";
import { StatisticsDTO } from "../dto/StatisticsDTO";
import { BaseListEntity } from "../entity/BaseListEntity";
import { StatisticsService } from "../service/StatisticsService";

@Route('statistics')
@Tags('统计')
@Middlewares([checkLogin])
export class StatisticsController extends BaseController{

	@Get('/all')
	public async getTotalStatistics(@Request() req: ExpressRequest): Promise<BaseListEntity<StatisticsDTO>> {
		const statisticsService = new StatisticsService()
		const result = await statisticsService.getTotalStatisticsInfo()
		return this.successListResponse(req, result)
	}

}