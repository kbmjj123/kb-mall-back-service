import mongoose from "mongoose";
import { BrandDTO } from "@/dto/BrandDTO";

const brandSchema = new mongoose.Schema<BrandDTO>({
  name: {
    type: String,
    required: [true, '请维护品牌名称']
  }
});

export const BrandModel = mongoose.model('brandModel', brandSchema, 'brands');