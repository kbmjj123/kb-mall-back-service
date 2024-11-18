import { Types } from "mongoose";
import { LanguageDTO } from './LanguageDTO'
import { ProductState } from "../enum/business";

export interface ProductDTO extends LanguageDTO{
	cates: Types.ObjectId[];
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

export type EditProductParams = Partial<ProductDTO> & { brandId: string }

export type CheckSlugParams = Pick<ProductDTO, 'slug'>