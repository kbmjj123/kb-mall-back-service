import mongoose from "mongoose";
import { BrandDTO } from "@/dto/BrandDTO";
import { TranslatePlugin } from "@/plugins/TranslatePlugin";
import { T_BRAND_KEYS, TBrandModel } from "./translate-models/TBrandMode";

const MODEL_NAME = 'brandModel'

const brandSchema = new mongoose.Schema<BrandDTO>({
  name: {
    type: String,
    required: [true, '请维护品牌名称']
  }
});

// brandSchema.plugin(TranslatePlugin, {
// 	modelName: MODEL_NAME,
// 	model: TBrandModel,
// 	keysInCollection: T_BRAND_KEYS
// })
export const BrandModel = mongoose.model(MODEL_NAME, brandSchema, 'brands');
