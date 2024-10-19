import mongoose from "mongoose";
import { ProductDTO } from "../dto/ProductDTO";
import { TranslatePlugin } from "../plugins/TranslatePlugin";
import { T_PRODUCT_KEYS, TProductModel } from "./translate-models/TProductModel";
const MODEL_NAME = 'productModel'
const productSchema = new mongoose.Schema<ProductDTO>({
	cates: {
		type: [{ type: mongoose.SchemaTypes.ObjectId }],
		default: [],
		required: [true, '请维护分类id']
	},
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
	descPictures: {
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
		enum: ['online', 'offline'],
		default: 'online',
		required: [true, '请维护上架状态']
	}
});

// 注册需要使用翻译服务的插件
productSchema.plugin(TranslatePlugin, {
	modelName: MODEL_NAME,
	model: TProductModel,
	keysInCollection: T_PRODUCT_KEYS
})

export const ProductModel = mongoose.model(MODEL_NAME, productSchema, 'products');