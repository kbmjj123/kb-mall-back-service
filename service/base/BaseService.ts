import { IService } from "./IService";
import { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { Request as ExpressRequest } from "express";
import { PageDTO, PageResultDTO } from "@/dto/PageDTO";
import { PAGE_SIZE } from "@/config/ConstantValues";
import { ISoftDeleteDTO } from "@/dto/soft-delete-dto/ISoftDeleteDTO";

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
	async sofeDeleteById(id: string, req: ExpressRequest): Promise<T | null> {
		const doc = await this.model.findById(id)
		return doc ? doc.softDelete() : null
	}
	isExist(query: FilterQuery<T>, req: ExpressRequest): Promise<T | null> {
		return this.findOne(query, req)
	}
	findList(nameInCollection: string, pageInfo: PageDTO): Promise<PageResultDTO<T>> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<T[]> {
		throw new Error("Method not implemented.");
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
	/**
	 * 公共的分页查询方法
	 * @param nameInCollection 在collection中name的名称
	 * @param pageInfo 分页信息
	 * @returns 
	 */
	async findListInPage(nameInCollection: string, pageInfo: PageDTO): Promise<PageResultDTO<T>> {
		let { keyword, pageIndex = 1, pageSize = PAGE_SIZE } = pageInfo
		let resultArrayPromise = []
		if (keyword) {
			const regex = new RegExp(keyword as string, 'i')
			const query = {
				[nameInCollection]: { $regex: regex }
			} as FilterQuery<T>
			resultArrayPromise.push(this.model.countDocuments())
			resultArrayPromise.push(this.model.find(query).skip((Number(pageIndex - 1)) * Number(pageSize)).limit(Number(pageSize)))
		}else{
			resultArrayPromise.push(this.model.estimatedDocumentCount())
			resultArrayPromise.push(this.model.find().skip(pageIndex * pageSize).limit(pageSize))
		}
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
	findOneAndUpdate(req: ExpressRequest, filter?: FilterQuery<T> | undefined, update?: UpdateQuery<T> | undefined, options?: QueryOptions<T> | null | undefined): Promise<T | null> {
		return this.model.findOneAndUpdate(filter, update, options).setOptions(this.getLanguageOptions(req))
	}
}