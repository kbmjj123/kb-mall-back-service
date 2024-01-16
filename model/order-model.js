const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  createTime: {
    type: Date,
    required: [true, '请维护订单创建时间']
  },
  products: {
    type: Array[mongoose.SchemaTypes.ObjectId],
    valiate: {
      validator: function(val){
        return val && val.length > 0
      },
      message: props => `${props.value}必须至少包含一个`
    }
  },
  
});

const orderModel = mongoose.model('orderModel', orderSchema, 'orders')