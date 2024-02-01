const mongoose = require('mongoose');

const cateSchema = new mongoose.Schema({
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

const cateModel = mongoose.model('cateModel', cateSchema, 'cates')

module.exports = cateModel