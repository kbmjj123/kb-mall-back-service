import mongoose from "mongoose";
import { CarDTO, CarItemDTO } from "../dto/CarDTO";
import { CarItemState } from "../enum/business";

const CAR_MODEL_NAME = 'shoppingCarModel'

const carItemSchema = new mongoose.Schema<CarItemDTO>({
	productName: {
		type: String,
		required: [true, '请维护商品名称']
	},
	masterPicture: {
		type: String,
		required: [true, '请维护商品主图']
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
	sales: {
		type: Number,
		min: 0
	},
	itemState: {
		type: String,
		enum: Object.values(CarItemState),
		default: CarItemState.NORMAL,
		required: [true, '请维护商品状态']
	}
})

const carSchema = new mongoose.Schema<CarDTO>({
	userId: mongoose.SchemaTypes.ObjectId,
	items: [carItemSchema],
	totalQuantity: {
		type: Number,
		min: 1
	},
	totalPrice: {
		type: Number,
		min: 0
	}
})

export const ShoppingCarModel = mongoose.model(CAR_MODEL_NAME, carSchema)