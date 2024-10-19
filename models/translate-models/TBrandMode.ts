import { TBrandDTO } from "../../dto/translate-dto/TBrandDTO"
import mongoose from "mongoose"

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