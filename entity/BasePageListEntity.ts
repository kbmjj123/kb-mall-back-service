import { BaseEntity } from "./BaseEntity";

export type PageListType<T> = {
	list: T[],
	total: number,
	pageSize: number,
	pageIndex: number,
	pages: number
}

export interface BasePageListEntity<T> extends BaseEntity<T> {
	data: PageListType<T>
}