import { Schema } from "mongoose"
import mongooseHidden from 'mongoose-hidden'

export type AutoHideOptions = {}

export const AutoHidePropertyPlugin = (schema: Schema, options?: AutoHideOptions) => {
	// 将_id映射为id
	schema.virtual('id').get(function(){
		return this._id?.toString()
	})
	// 启用虚拟字段隐藏
  schema.set('toObject', { virtuals: true })
  schema.set('toJSON', { virtuals: true, getters: true })
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