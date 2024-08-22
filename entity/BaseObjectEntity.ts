import { BaseEntity } from "./BaseEntity";

export class BaseObjectEntity<T> extends BaseEntity {
	public data: T
	constructor(data: T, status?: number, message?: string) {
		super(status, message);
		this.data = data
	}
}