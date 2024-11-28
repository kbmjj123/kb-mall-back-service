import mongoose from "mongoose";
import { ProductDTO } from "../dto/ProductDTO";
import { LanguageItemType } from "../dto/LanguageDTO";
import { ProductState } from "../enum/business";
import { CATE_MODEL_NAME } from "./CateModel";
export const PRODUCT_MODEL_NAME = 'productModel'
const productSchema = new mongoose.Schema<ProductDTO>({
	// cates: {
	// 	type: [{ type: mongoose.SchemaTypes.ObjectId }],
	// 	ref: CATE_MODEL_NAME,
	// 	default: [],
	// 	required: [true, '请维护分类id']
	// },
	cates: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: CATE_MODEL_NAME,
			required: [true, '请维护分类id']
		}
	],
	brand: {
		type: mongoose.SchemaTypes.ObjectId,
	},
	productName: {
		type: String,
		required: [true, '请维护商品名称']
	},
	masterPicture: {
		type: String,
		required: [true, '请维护商品主图']
	},
	descPic: {
		type: [String],
		required: [true, '请维护商品图片']
	},
	slug: {
		type: String,
		required: [true, '请维护商品的唯一码'],
		uniqued: true
	},
	price: {
		type: Number,
		validate: {
			validator: function (val: number) {
				return val > 0
			},
			message: (props: { value: any; }) => `${props.value}不符合规范，商品价格必须大于0`
		}
	},
	activityPrice: {
		type: Number,
		validate: {
			validator: function (val: number) {
				return val > 0
			},
			message: (props: { value: any; }) => `${props.value}不符合规范，活动价格必须大于0`
		}
	},
	sales: {
		type: Number,
		min: 0
	},
	score: {
		type: Number,
		min: 0
	},
	richText: String,
	state: {
		type: String,
		enum: Object.values(ProductState),
		default: ProductState.ON_LINE,
		required: [true, '请维护上架状态']
	},
	languageList: Array<LanguageItemType>
});


export const ProductModel = mongoose.model(PRODUCT_MODEL_NAME, productSchema, 'products');