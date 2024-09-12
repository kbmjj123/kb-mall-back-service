import { IService } from "./IService";
import { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { Request as ExpressRequest } from "express";

/**
 * 数据库层面的基础服务，根据传递的参数，封装相关的数据库基本操作
*/
export class BaseService<T> implements IService<T> {

	private model: Model<T>;

	constructor(model: Model<T>) {
		this.model = model
	}

	/**
	 * 根据每次请求获取对应的语言信息配置
	 * @param req 发起的请求
	 * @param options db操作的相关配置
	 */
	protected getLanguageOptions(req: ExpressRequest, options: any = {}) {
		options['language'] = req.language
		return options
	}

	/**
	 * 往文档中追加语言信息
	 * @param req 客户端发起的请求
	 * @param doc 待操作的文档
	 */
	protected appendLanguageToDoc(req: ExpressRequest, doc: any) {
		doc['language'] = req.language
		return doc
	}

	create(data: Partial<T>, req: ExpressRequest): Promise<T> {
		this.appendLanguageToDoc(req, data)
		return this.model.create(data)
	}
	update(id: string, data: Partial<T>, req: ExpressRequest): Promise<T | null> {
		const options = this.getLanguageOptions(req, {})
		return this.model.findByIdAndUpdate(id, data).setOptions(options)
	}
	findById(id: string, req: ExpressRequest): Promise<T | null> {
		return this.model.findById(id).setOptions(this.getLanguageOptions(req, {}))
	}
	findOne(filter: FilterQuery<T> | undefined, req: ExpressRequest): Promise<T | null> {
		return this.model.findOne(filter).setOptions(this.getLanguageOptions(req))
	}
	findListInPage(): Promise<T[] | null> {
		throw new Error("Method not implemented.");
	}
	findOneAndUpdate(req: ExpressRequest, filter?: FilterQuery<T> | undefined, update?: UpdateQuery<T> | undefined, options?: QueryOptions<T> | null | undefined): Promise<T | null> {
		return this.model.findOneAndUpdate(filter, update, options).setOptions(this.getLanguageOptions(req))
	}
}