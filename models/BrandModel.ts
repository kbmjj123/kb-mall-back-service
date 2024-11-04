import mongoose from "mongoose";
import { BrandDTO } from "../dto/BrandDTO";
import { LanguageItemType } from "../dto/LanguageDTO";

const MODEL_NAME = 'brandModel'

const brandSchema = new mongoose.Schema<BrandDTO>({
  name: {
    type: String,
    required: [true, '请维护品牌名称']
  },
	icon: String,
	languageList: Array<LanguageItemType>
});


export const BrandModel = mongoose.model(MODEL_NAME, brandSchema, 'brands');
