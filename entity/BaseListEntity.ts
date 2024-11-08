import { BaseEntity } from "./BaseEntity";

export class BaseListEntity<T> extends BaseEntity<T> {
	data?: Array<T>
}