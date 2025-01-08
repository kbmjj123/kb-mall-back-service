import { IService, PopulateOptionType } from "./IService";
import { FilterQuery, Model, Query, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline, UpdateWriteOpResult } from "mongoose";
import { Request as ExpressRequest } from "express";
import { PageDTO, PageResultDTO } from "../../dto/PageDTO";
import { PAGE_SIZE } from "../../config/ConstantValues";
import { ISoftDeleteDTO } from "../../dto/soft-delete-dto/ISoftDeleteDTO";
import { errorLogger } from "../../utils/Logger";

/**
 * 数据库层面的基础服务，根据传递的参数，封装相关的数据库基本操作
*/
export class BaseService<T extends ISoftDeleteDTO> implements IService<T> {

	//@ts-ignore
	private model: Model<T>;
	//@ts-ignore
	constructor(model: Model<T>) {
		this.model = model
	}

	/**
	 * 将结果转为DTO对象
	*/
	protected toDTO(doc: any) {
		return doc && doc.toObject()
	}

	/**
	 * 根据查询目标结果构造query
	 * @param query 
	 * @param req 
	 * @param select 
	 * @param populate 
	 */
	// @ts-ignore
	public buildQuery(query: Query, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Query {
		if(select && select.length > 0){
			query.select(select.map(item => `+${item}`).join(' '))
		}
		if(populate){
			query.populate(populate)
		}
		query.setOptions(this.getLanguageOptions(req, {}))
		return query
	}

	protected getModel() {
		return this.model
	}
	/**
	 * 公共的软删除操作
	 * @param id - 待删除的id
	 * @param req - 客户端发起的请求
	 * @returns 
	 */
	async sofeDeleteById(id: string, req: ExpressRequest): Promise<T | null> {
		const doc = await this.model.findById(id)
		return doc ? doc.softDelete() : null
	}
	isExist(query: FilterQuery<T>, req: ExpressRequest): Promise<T | null> {
		return this.findOne(query, req)
	}
		/**
	 * 根据每次请求获取对应的语言信息配置
	 * @param req - 发起的请求
	 * @param options - db操作的相关配置
	 */
	protected getLanguageOptions(req: ExpressRequest, options: any = {}) {
		options['language'] = req.language
		return options
	}
	/**
	 * 往文档中追加语言信息
	 * @param req - 客户端发起的请求
	 * @param doc - 待操作的文档
	 */
	protected appendLanguageToDoc(req: ExpressRequest, doc: any) {
		doc['language'] = req.language
		return doc
	}

	create(data: Partial<T>, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Promise<T> {
		this.appendLanguageToDoc(req, data)
		return this.model.create(data)
	}
	/************ 以下是更新的操作 ************/
	/**
	 * 根据id来更新文档
	*/
	async update(id: string, data: UpdateQuery<T>, req: ExpressRequest, options?: QueryOptions<T> | null | undefined): Promise<T | null> {
		options = this.getLanguageOptions(req, {new: true})
		try{
			if(options){
				return await this.model.findByIdAndUpdate(id, data).setOptions(options)
			}else{
				return await this.model.findByIdAndUpdate(id, data)
			}
		}catch(error){
			errorLogger.error(`[update]异常`)
			errorLogger.error(error)
			throw new Error(`数据库update异常`)
		}
	}
	/**
	 * 根据条件过滤一个文档并进行更新操作
	*/
	async findOneAndUpdate(req: ExpressRequest, filter?: FilterQuery<T> | undefined, update?: UpdateQuery<T> | undefined, options?: QueryOptions<T> | null | undefined, select?: string[], populate?: PopulateOptionType): Promise<T | null> {
		const query = this.buildQuery(this.model.findOneAndUpdate(filter, update, options), req, select, populate)
		try{
			return await query.exec()
		}catch(error){
			errorLogger.error(`[findOneAndUpdate]异常`)
			errorLogger.error(error)
			throw new Error(`数据库findOneAndUpdate查询异常`)
		}
	}
	/**
	 * 一次性更新多个文档
	*/
	async updateMany(filter: FilterQuery<T> | undefined, update: UpdateWithAggregationPipeline | UpdateQuery<T>, req: ExpressRequest, options?: QueryOptions<T> | null | undefined): Promise<UpdateWriteOpResult | null> {
		options = this.getLanguageOptions(req, {new: true})
		return this.model.updateMany(filter, update)
	}
	/************ 以下是单个查询的操作 ************/
	/**
	 * 通用的findById方法
	 * @param id - 文档的唯一id
	 * @param req - Express请求对象
	 * @param select - 查询时需要选择的字段
	 * @param populate - 填充选项，使用 Mongoose 的 PopulateOptions 类型
	 * @returns 查询到的文档或者是null
	 */
	async findById(id: string, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Promise<T | null> {
		const query = this.buildQuery(this.model.findById(id), req, select, populate)
		try{
			return await query.exec()
		}catch(error){
			errorLogger.error(`[findById]-${id}异常`)
			errorLogger.error(error)
			throw new Error(`数据库查询${id}异常`)
		}
	}
	/**
	 * 根据筛选条件查询文档
	 * @param filter - 查询的过滤筛选条件
	 * @param req - Express请求对象
	 * @param select - 查询时需要选择的字段
	 * @param populate - 填充选项，使用 Mongoose 的 PopulateOptions 类型
	 * @returns 查询到的文档或者是null
	 */
	async findOne(filter: FilterQuery<T> | undefined, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Promise<T | null> {
		const query = this.buildQuery(this.model.findOne(filter), req, select, populate)
		try{
			return await query.exec()
		}catch(error){
			errorLogger.error(`[findOne]异常`)
			errorLogger.error(error)
			throw new Error(`数据库findOne查询异常`)
		}
	}
	/************ 以下是集合的查询操作 ************/
	/**
	 * 根据条件查询全量记录
	 * @param filter - 查询的过滤筛选条件
	 * @param req - Express请求对象
	 * @param select - 查询时需要选择的字段
	 * @param populate - 填充选项，使用 Mongoose 的 PopulateOptions 类型
	 * @returns 全量的文档记录
	 */
	async findAll(filter: FilterQuery<T> | undefined | null, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Promise<T[]> {
		const query = this.buildQuery(this.model.find(filter || {}), req, select, populate)
		try{
			return await query.exec()
		}catch(error){
			errorLogger.error(`[findAll]异常`)
			errorLogger.error(error)
			throw new Error(`数据库findAll查询异常`)
		}
	}
	/**
	 * 覆盖的全量查询数据操作，主要针对查询出来的doc进行二次加工
	 * @param filter - 查询的过滤筛选条件
	 * @param req - Express请求对象
	 * @param select - 查询时需要选择的字段
	 * @param populate - 填充选项，使用 Mongoose 的 PopulateOptions 类型
	 * @returns 全量的文档记录
	 */
	async findAllObject(filter: FilterQuery<T> | undefined | null, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Promise<T[]> {
		const resultList = await this.findAll(filter, req, select, populate)
		return resultList.map((item) => this.toDTO(item))
	}
	/**
	 * 公共的分页查询列表动作
	 * @param filter - 查询的过滤筛选条件
	 * @param req - Express请求对象
	 * @param pageInfo - 分页信息
	 * @param select - 查询时需要选择的字段
	 * @param populate - 填充选项，使用 Mongoose 的 PopulateOptions 类型
	 * @returns 查询到的结构化结果集合
	 */
	async findList(filter: FilterQuery<T> | undefined, req: ExpressRequest, pageInfo: PageDTO, select?: string[], populate?: PopulateOptionType): Promise<PageResultDTO<T>> {
		let { pageIndex = 1, pageSize = PAGE_SIZE } = pageInfo
		let resultArrayPromise = []
		if(pageIndex < 1){
			pageIndex = 1
		}
		resultArrayPromise.push(filter ? this.model.countDocuments() : this.model.estimatedDocumentCount())
		const query = this.buildQuery(this.model.find(filter || {}), req, select, populate)
		query.skip((Number(pageIndex - 1)) * Number(pageSize)).limit(Number(pageSize))
		resultArrayPromise.push(query)
		let [total = 0, searchList = []] = await Promise.all(resultArrayPromise)
		const result = {
			list: searchList,
			total: total as number,
			pageSize,
			pageIndex,
			pages: Math.ceil(total as number / pageSize)
		} as PageResultDTO<T>
		return Promise.resolve(result)
	}
	
	/******* 以下是记录中数组属性的相关操作 ********/

	/**
	 * @param id - 待处理的文档记录id
	 * @param itemData - 组装的待插入到数组字段的item
	 * @returns 操作后的文档记录
	 */
	async addItemToListInObj<U>(id: string, itemData: Record<string, Partial<U>>): Promise<T | null> {
		const targetObj = await this.model.findByIdAndUpdate(id, {
			$push: itemData
		}, { new: true })
		return targetObj
	}
	removeItemInListInObj<U>(): Promise<U | null> {
		throw new Error("Method not implemented.");
	}
	getItemInListInObj<U>(): Promise<U | null> {
		throw new Error("Method not implemented.");
	}

	findListInObj<U>(filter: FilterQuery<T> | undefined, req: ExpressRequest, select?: []): Promise<U[] | null> {
		throw new Error("Method not implemented.");
	}
}