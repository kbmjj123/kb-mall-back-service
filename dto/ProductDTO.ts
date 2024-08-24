import { Types } from "mongoose";

export interface ProductDTO{
	cates: Types.ObjectId[];
	productName: string;
	masterPicture: string;
	descPictures: string[];
	slug: string;
	state: "online" | "offline";
	richText?: string | null | undefined;
	brand?: Types.ObjectId | null | undefined;
	price?: number | null | undefined;
	activityPrice?: number | null | undefined;
	sales?: number | null | undefined;
	score?: number | null | undefined;
	
}