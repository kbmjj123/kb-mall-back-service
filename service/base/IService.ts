import { Request as ExpressRequest } from 'express'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export interface IService<T> {
	create(data: Partial<T>, req: ExpressRequest): Promise<T>;
	update(id: string, data: Partial<T>, req: ExpressRequest): Promise<T | null>;
	findById(id: string, req: ExpressRequest): Promise<T | null>;
	findOne(filter: FilterQuery<T> | undefined, req: ExpressRequest): Promise<T | null>;
	findListInPage(): Promise<Array<T> | null>
	findOneAndUpdate(req: ExpressRequest, filter?: FilterQuery<T> | undefined, update?: UpdateQuery<T> | undefined, options?: QueryOptions<T> | null | undefined): Promise<T | null>;
}
