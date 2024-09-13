/**
 * 分页请求参数DTO
 */
export interface PageDTO {
	pageIndex: number,
	pageSize: number,
	keyword?: string,
	[index: string]: any
}
/**
 * 分页结果DTO
 */
export interface PageResultDTO<T> {
	list: T[],
	total: number,
	pageSize: number,
	pageIndex: number,
	pages: number
}