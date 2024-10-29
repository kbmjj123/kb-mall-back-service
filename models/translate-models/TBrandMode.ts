import { TBrandDTO } from "../../dto/translate-dto/TBrandDTO"
import mongoose from "mongoose"

/**
 * 需要翻译的字段
*/
export const T_BRAND_KEYS = [
	'name'
]

const tBrandSchema = new mongoose.Schema<TBrandDTO>({
	businessId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: [true, '请维护业务id']
	}
})

export const TBrandModel = mongoose.model('tBrandModel', tBrandSchema, 'tBrands')