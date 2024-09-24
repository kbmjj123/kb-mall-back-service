/**
 * 作为项目中所有collection的schema所继承的基础接口，提供软删除相关的字段属性
 */
export interface ISoftDeleteDTO {
	/**
	 * 记录创建时间
	 */
	createTime?: Date,
	/**
	 * 记录修改时间
	*/
	modifyTime?: Date,
	/**
	 * 记录删除时间
	*/
	deleteTime?: Date| null,
	/**
	 * 针对所有相关的文档，提供文档实例的软删除方法
	*/
	softDelete(): Promise<this>
}