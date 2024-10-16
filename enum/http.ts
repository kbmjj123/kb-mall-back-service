export enum LogicResult {
	SUCCESS = 0,
	FORBIT = 403,
	FAILED = -1,
	PARAMS_ERROR = -2,
	NO_FOUND = 404,
	LOGIN_TIMEOUT = -999
}

export enum HttpCode {
	SUCCESS = 200
}

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'