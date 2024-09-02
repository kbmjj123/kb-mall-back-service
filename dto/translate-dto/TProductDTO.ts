import { IBaseDTO } from "./IBaseDTO";

export interface TProductDTO extends IBaseDTO{
	productName: string,
	richText: string
}