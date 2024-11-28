import mongoose from "mongoose";
import { WishlistDTO, WishlistItemDTO } from "../dto/WishlistDTO";
import { WishlistType } from "../enum/business";

export const WISHLIST_MODEL_NAME = 'wishlistModel'

const wishlistItemSchema = new mongoose.Schema<WishlistItemDTO>({
	productName: String,
	price: Number,
	masterPicture: String,
	slug: String
})

const wishlistSchema = new mongoose.Schema<WishlistDTO>({
	userId: {
		type: mongoose.Types.ObjectId,
		required: [true, '请维护用户id']
	},
	name: String,
	description: String,
	type: {
		type: String,
		enum: Object.values(WishlistType),
		default: WishlistType.PRIVACY,
		required: [true, '请维护清单类型']
	},
	shareLink: {
		type: String,
		default: ''
	},
	items: [wishlistItemSchema]
})

export const WishlistModel = mongoose.model(WISHLIST_MODEL_NAME, wishlistSchema)