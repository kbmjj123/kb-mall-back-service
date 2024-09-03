import { TBaseDTO } from "./TBaseDTO";

export interface TProductDTO extends TBaseDTO{
	productName: string,
	richText: string
}