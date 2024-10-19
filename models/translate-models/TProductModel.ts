import { TProductDTO } from "../../dto/translate-dto/TProductDTO";
import mongoose from "mongoose";

export const T_PRODUCT_KEYS = [
	'productName',
	'richText'
]

const tProductSchema = new mongoose.Schema<TProductDTO>({
	businessId: {
		type: mongoose.SchemaTypes.ObjectId,
    required: [true, '请维护业务id']
	}
});

export const TProductModel = mongoose.model('tProductModel', tProductSchema, 'tProducts');