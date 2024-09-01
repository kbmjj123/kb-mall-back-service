import mongoose from "mongoose";

const shopCarSchema = new mongoose.Schema({
	userId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: [true, '请维护用户id']
	},
	productId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'products',
		require: [true, '请维护产品id']
	},
	carNum: {
		type: Number,
		min: 1
	},
});

export const ShopCarModel = mongoose.model('', shopCarSchema, 'shopCars');
