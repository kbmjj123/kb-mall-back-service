import express from "express";

declare global {
	namespace Express {
		export interface Response {
			success: (payload: any, msg?: string) => void,
			failed: (status: number, payload: any, msg: string) => {}
		}
		export interface Request {
			user?: any
		}
	}
}
