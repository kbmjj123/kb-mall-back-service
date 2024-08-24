export interface PageDTO {
	pageIndex: number,
	pageSize: number,
	keyword?: string,
	[index: string]: any
}