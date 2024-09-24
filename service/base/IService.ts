import { PageDTO, PageResultDTO } from '@/dto/PageDTO';
import { ISoftDeleteDTO } from '@/dto/soft-delete-dto/ISoftDeleteDTO';
import { Request as ExpressRequest } from 'express'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export interface IService<T extends ISoftDeleteDTO> {
	create(data: Partial<T>, req: ExpressRequest): Promise<T>;
	update(id: string, data: Partial<T>, req: ExpressRequest): Promise<T | null>;
	sofeDeleteById(id: string, req: ExpressRequest): Promise<T | null>;
	findById(id: string, req: ExpressRequest): Promise<T | null>;
	isExist(query: FilterQuery<T>, req: ExpressRequest): Promise<T | null>;
	findOne(filter: FilterQuery<T> | undefined, req: ExpressRequest): Promise<T | null>;
	findList(nameInCollection: string, pageInfo: PageDTO): Promise<PageResultDTO<T>>
	findAll(): Promise<T[]>
	findOneAndUpdate(req: ExpressRequest, filter?: FilterQuery<T> | undefined, update?: UpdateQuery<T> | undefined, options?: QueryOptions<T> | null | undefined): Promise<T | null>;
}
