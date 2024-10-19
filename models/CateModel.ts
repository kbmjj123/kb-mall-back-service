import mongoose, { InferSchemaType } from "mongoose";
import { CateDTO } from "../dto/CateDTO";
import { TranslatePlugin } from "../plugins/TranslatePlugin";
import { T_CATE_KEYS, TCateModel } from "./translate-models/TCateModel";

const MODEL_NAME = 'cateModel'
const cateSchema = new mongoose.Schema<CateDTO>({
  title: {
    type: String,
    required: [true, '请维护分类名称']
  },
  level: {
    type: Number,
    enum: {
      values: [0, 1, 2],
      message: '{VALUE} 不是合法的分类枚举值'
    }
  },
  parentId: {
    type: mongoose.SchemaTypes.ObjectId,
    default: ''
  }
});
// cateSchema.plugin(TranslatePlugin, {
// 	modelName: MODEL_NAME,
// 	model: TCateModel,
// 	keysInCollection: T_CATE_KEYS
// })
export const CateModel = mongoose.model(MODEL_NAME, cateSchema, 'cates')
