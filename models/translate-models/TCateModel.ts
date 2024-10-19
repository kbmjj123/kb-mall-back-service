import { TBrandDTO } from "../../dto/translate-dto/TBrandDTO"
import mongoose from "mongoose"

export const T_CATE_KEYS = [
	'name'
]

const tCateSchema = new mongoose.Schema<TBrandDTO>({
	businessId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: [true, '请维护业务id']
	}
})

export const TCateModel = mongoose.model('tCateModel', tCateSchema, 'tCates')