import mongoose from "mongoose";

const evaluateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  userNick: {
    type: String,
    required: [true, '请维护评价人昵称']
  },
  userAvatar: {
    type: String
  },
  productId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, '请赋值评价的商品id']
  },
  score: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, '请维护评分分值']
  },
  title: {
    type: String,
    required: [true, '请维护评分标题']
  },
  content: {
    type: String,
    required: [true, '请维护评分内容']
  },
  pictures: {
    type: Array<String>
  },
  evaluateTime: Date
});

evaluateSchema.post('save', (doc) => {
  //TODO 当对一个商品成功发布评价时，需要将对应的商品的分值进行一个重新计算，并维护到商品表中
});

const evaluateModel = mongoose.model('evaluateModel', evaluateSchema, 'evaluates');

export default evaluateModel;