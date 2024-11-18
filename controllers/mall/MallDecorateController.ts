import { Get, Request, Route, Tags } from "tsoa";
import { BaseController } from "../BaseController";
import mockjs from "mockjs";
import { Request as ExpressRequest } from "express";
import { getOnePic } from "../../utils/MediaUtils";

@Route('/api/decorate')
@Tags('装修模块')
export class MallDecorateController extends BaseController {

	/**
	 * 获取轮播图
	*/
	@Get('/carousel/list')
	public async getCarouselList(@Request() req: ExpressRequest) {
		return this.successResponse(req, Array.from({ length: 5 }, () => ({
			id: mockjs.Random.guid(),
			title: mockjs.Random.ctitle(4, 6),
			description: mockjs.Random.cword(10, 20),
			detail: mockjs.Random.cword(20, 30),
			link: '',
			bgImage: getOnePic(1920, 660, 10),
			cover: getOnePic(1920, 660)
		})))
	}

	/**
	 * 获取推荐的品牌列表
	*/
	@Get('/brand/list')
	public async getRecommendBrandList(@Request() req: ExpressRequest) {
		return this.successResponse(req, Array.from({ length: 8 }, () => ({
			id: mockjs.Random.guid(),
			name: mockjs.Random.cword(2, 6),
			icon: getOnePic(mockjs.Random.integer(100, 200), mockjs.Random.integer(80, 150))
		})))
	}

}