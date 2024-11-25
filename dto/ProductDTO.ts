import { Types } from "mongoose";
import { LanguageDTO } from './LanguageDTO'
import { ProductState } from "../enum/business";
import { CateDTO } from "./CateDTO";

export interface ProductDTO extends LanguageDTO{
	cates: Types.ObjectId[] | CateDTO[];
	productName: string;
	masterPicture: string;
	descPic: string[];
	slug: string;
	state: ProductState;
	richText?: string | null | undefined;
	brand?: Types.ObjectId | null | undefined;
	price?: number | null | undefined;
	activityPrice?: number | null | undefined;
	sales?: number | null | undefined;
	score?: number | null | undefined;
}

/**
 * 品牌
*/
export type EditProductParams = Partial<ProductDTO> & { brandId: string }

/**
 * slug参数
*/
export type CheckSlugParams = Pick<ProductDTO, 'slug'>

/**
 * 商城端获取的商品信息
*/
export type ProductDetailDTO = ProductDTO & {
	cates: Pick<CateDTO, 'id' | 'title' | 'level'>[]
}