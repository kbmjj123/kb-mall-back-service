const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  cates: {
    type: [{type: mongoose.SchemaTypes.ObjectId}],
    default: [],
    required: [true, '请维护分类id']
  },
  brand: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  productName: {
    type: String,
    required: [true, '请维护商品名称']
  },
  masterPicture: {
    type: String,
    required: [true, '请维护商品主图']
  },
  descPictures: [String],
  slug: {
    type: String,
    uniqued: true
  },
  price: {
    type: Number,
    validate: {
      validator: function(val){
        return val > 0
      },
      message: props => `${props.value}不符合规范，商品价格必须大于0`
    }
  },
  activityPrice: {
    type: Number,
    validate: {
      validator: function(val){
        return val > 0
      },
      message: props => `${props.value}不符合规范，活动价格必须大于0`
    }
  },
  sales: {
    type: Number,
    min: 0
  },
  score: {
    type: Number,
    min: 0
  },
  richText: String
});

const productModel = mongoose.model('productModel', productSchema, 'products');

module.exports = productModel;