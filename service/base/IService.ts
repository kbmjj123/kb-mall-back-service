import { PageDTO, PageResultDTO } from '../../dto/PageDTO';
import { ISoftDeleteDTO } from '../../dto/soft-delete-dto/ISoftDeleteDTO';
import { Request as ExpressRequest } from 'express'
import { FilterQuery, QueryOptions, UpdateQuery, PopulateOptions } from 'mongoose';

export type PopulateOptionType = string | string[] | PopulateOptions | PopulateOptions[]

export interface IService<T extends ISoftDeleteDTO> {
	create(data: Partial<T>, req: ExpressRequest): Promise<T>;
	update(id: string, data: Partial<T>, req: ExpressRequest): Promise<T | null>;
	findOneAndUpdate(req: ExpressRequest, filter?: FilterQuery<T> | undefined, update?: UpdateQuery<T> | undefined, options?: QueryOptions<T> | null | undefined, select?: string[], populate?: PopulateOptionType): Promise<T | null>;
	sofeDeleteById(id: string, req: ExpressRequest): Promise<T | null>;
	findById(id: string, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Promise<T | null>;
	findOne(filter: FilterQuery<T> | undefined, req: ExpressRequest, select?: string[], populate?: PopulateOptionType): Promise<T | null>;
	isExist(filter: FilterQuery<T>, req: ExpressRequest): Promise<T | null>;
	findList(filter: FilterQuery<T> | undefined, req: ExpressRequest, pageInfo: PageDTO, select?: string[], populate?: PopulateOptionType): Promise<PageResultDTO<T>>
	findAll(filter: FilterQuery<T> | undefined, req: ExpressRequest): Promise<T[]>;
}
