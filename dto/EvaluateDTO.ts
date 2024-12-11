import { Types } from "mongoose";
import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";
import { PageDTO } from "./PageDTO";

export interface EvaluateDto extends ISoftDeleteDTO{
	/**
	 * 用户id
	*/
	userId: string;
	/**
	 * 用户昵称
	*/
	userNick: string;
	/**
	 * 用户头像
	*/
	userAvatar?: string | null | undefined;
	/**
	 * 产品id
	*/
	productId: string;
	/**
	 * 商品分数
	*/
	score: number;
	/**
	 * 发布的标题
	*/
	title: string;
	/**
	 * 发布的内容
	*/
	content: string;
	/**
	 * 发布时间
	*/
	evaluateTime?: Date | null | undefined;
	/**
	 * 追加的图片信息
	*/
	pictures?: string[] | null | undefined;

}

/**
 * 获取商品列表所需参数
*/
export interface EvaludateListParams extends PageDTO{
	/**
	 * 产品id
	*/
	productId: string
}

/**
 * 发布一个商品的评价所需参数
*/
export type PublishEvaluteParams = Pick<EvaluateDto, 'productId' | 'title' | 'content' | 'score' | 'pictures'>