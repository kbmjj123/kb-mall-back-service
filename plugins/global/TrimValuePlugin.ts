import { Schema } from 'mongoose'

/**
 * 去除保存数据时，文档中两端的空白字符
*/
export const TrimValuePlugin = (schema: Schema, options: any) => {
  // 这里的options则代表插件的参数，可实现参数化掉用的目的
  // schema为mongoose中的所有的schema对象，通过对这个schema中的属性进行遍历处理
  schema.pre('save', function(next) {
    Object.keys(schema.paths).forEach(field => {
      if(this[field]){
        // 所有插入到db中的字段，都必须进行trim操作，避免存储了左右为空的字符串
        if(schema.pathType(field) === 'String'){
          // 如果文档中的field属性存在且为字符串类型的
          this[field] = this[field].toString().trim();// 统一去除字符串两端的空白字符串
        }
      }
    })
		next();
  })
}