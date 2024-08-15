import 'express'

declare module 'express' {
	export interface Response {
		success: (payload: any, msg: string) => void,
		failed: (status: number, payload: any, msg: string) => {}
	}
}
declare module 'express-serve-static-core' {
  interface Response {
    success: (payload: any, msg: string) => void,
		failed: (status: number, payload: any, msg: string) => {}
  }
}