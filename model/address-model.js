const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  isDefault: {
    type: Boolean,
    default: false
  },
  provinceCode: {
    type: String,
    required: true
  },
  provinceName: {
    type: String,
    required: true
  },
  cityCode: {
    type: String,
    required: true
  },
  areaName: {
    type: String,
    required: true
  },
  areaCode: {
    type: String,
    required: true
  },
  detailAddress: {
    type: String,
    required: [true, '请维护详细地址']
  }
}, {
  virtuals: {
    // 新增一“计算属性”，针对存储的字段进行一个过滤输出
    fullAddress: {
      get() {
        let result = ''
        if(-1 === this.detailAddress.indexOf(this.provinceName)){
          result += this.provinceName;
        }
        if(-1 === this.detailAddress.indexOf(this.cityName)){
          result += this.cityName;
        }
        result = `${result}${this.areaName}${this.detailAddress}`;
        return result;
      }
    }
  }
});

addressSchema.post('save', (doc) => {
  //TODO 当用户新增/编辑收货地址时，需判断是否为默认地址，从而触发用户信息中的默认收货地址
})

const addressModel = mongoose.model('addressModel', addressSchema, 'addresses');

module.exports = addressModel;