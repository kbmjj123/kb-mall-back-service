import mongoose, { Types } from "mongoose";
import { CateDTO } from "../dto/CateDTO";
import { LanguageItemType } from "../dto/LanguageDTO";

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
    type: Types.ObjectId,
    default: null
  },
	languageList: Array<LanguageItemType>
});

export const CateModel = mongoose.model(MODEL_NAME, cateSchema, 'cates')
