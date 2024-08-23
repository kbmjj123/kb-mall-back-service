import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '请维护品牌名称']
  }
});

const brandModel = mongoose.model('brandModel', brandSchema, 'brands');

export default brandModel