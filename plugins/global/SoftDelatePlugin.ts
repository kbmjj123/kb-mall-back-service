import { ISoftDeleteDTO } from '@/dto/soft-delete-dto/ISoftDeleteDTO'
import { Query, Schema } from 'mongoose'

export type SoftDeleteOptions = {}

export const SoftDeletePlugin = (schema: Schema, options: SoftDeleteOptions) => {
	//? 给所有的schema添加软删除所需的相关参数
	schema.add({
		createTime: { type: Date, default: Date.now, select: false },
		modifyTime: { type: Date, default: Date.now, select: false },
		deleteTime: { type: Date, default: null, select: false }
	})
	schema.pre<ISoftDeleteDTO>('save', function(next) {
		if(!this.createTime){
			//? 如果目标文档对象是第一次创建的，添加创建时间
			this.createTime = new Date()
		}
		this.modifyTime = new Date()
		next()
	})
	//? 定义公共的软删除的默认查询操作-> 自动过滤掉有删除时间deleteTime的记录
	const softDeleteFilter = function(this: Query<any, any>, next: Function){
		this.where({ deleteTime: null })
		next()
	}
	schema.pre('find', softDeleteFilter)
	schema.pre('findOne', softDeleteFilter)
	schema.pre('findOneAndUpdate', softDeleteFilter)
	schema.pre('countDocuments', softDeleteFilter)
	schema.pre('estimatedDocumentCount', softDeleteFilter)

	//? 提供公共的实例对象的软删除方法给每个实例
	schema.method('softDelete', function() {
		this.deleteTime = new Date()
		return this.save()
	})
	//? 提供批量根据查询条件来进行软删除操作
	schema.static('softDeleteMany', function(query) {
		return this.updateMany(query, { deleteTime: new Date() })
	})

	//! 以下是覆盖的mongoose的model的原本的相关删除方法，防止开发者错误调用，导致数据丢失
	const deleteMethods = [
		'deleteOne', 'deleteMany', 'findByIdAndDelete', 'findOneAndDelete'
	]
	const handleDelete = () => {
		throw new Error('无法直接调用删除方法，请调用softDelete()来替代下！')
	}
	deleteMethods.forEach(item => {
		schema.statics[item] = handleDelete
	})
	schema.methods.remove = handleDelete
}