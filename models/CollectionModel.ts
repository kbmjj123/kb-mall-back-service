import mongoose from "mongoose";
import { CollectionDTO } from "../dto/CollectionDTO";
import { PRODUCT_MODEL_NAME } from "./ProductModel";
import { USER_MODEL_NAME } from "./UserModel";

const collectionSchema = new mongoose.Schema<CollectionDTO>({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: USER_MODEL_NAME
	},
	productId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: PRODUCT_MODEL_NAME
	}
})

export const CollectionModel = mongoose.model('collectionModel', collectionSchema)