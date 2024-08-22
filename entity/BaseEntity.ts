export class BaseEntity {
	public status: number = 0;
	public message: string = '操作成功';

	constructor(status: number = 0, message: string = '操作成功'){
		this.status = status
		this.message = message
	}
}