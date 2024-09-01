import { BaseEntity } from "./BaseEntity";

export interface BaseObjectEntity<T> extends BaseEntity<T> {
	data?: T
}