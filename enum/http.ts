export enum LogicResult {
	SUCCESS = 0,
	FORBIT = 403,
	FAILED = -1,
	PARAMS_ERROR = -2,
	NO_FOUND = 404,
	LOGIN_TIMEOUT = -999
}
/**
 * 公共的系统层面的code
*/
export enum ResultCode {
	/**
	 * 操作成功
	*/
	SUCCESS = 0,
	/**
	 * 操作失败
	*/
	FAILED = -1,
	/**
	 * 请求无效，一般是参数错误
	*/
	PARAMS_ERROR = 400,
	/**
	 * 无权限
	*/
	FORBIT = 401,
	/**
	 * 资源未找到
	*/
	NO_FOUND = 404,
	/**
	 * 资源冲突
	*/
	CONFLICT = 409,
	
}
/************ 业务逻辑错误编码(5位数字) **************/

export enum HttpCode {
	SUCCESS = 200
}

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'