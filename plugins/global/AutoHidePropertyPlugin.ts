import { Schema } from "mongoose"
import mongooseHidden from 'mongoose-hidden'

export type AutoHideOptions = {}

export const AutoHidePropertyPlugin = (schema: Schema, options?: AutoHideOptions) => {
	schema.virtual('id').get(function(){
		return this._id?.toString()
	})
	// 启用虚拟字段的输出
  schema.set('toObject', { virtuals: true })
  schema.set('toJSON', { virtuals: true })
	schema.plugin(mongooseHidden(), {
		// 全局配置隐藏相关的数据
		hidden: {
			_id: true,
			__v: true
		},
		// 启用虚拟字段
		virtuals: true
	})
}