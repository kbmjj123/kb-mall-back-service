import express from "express";
import type { i18n } from 'i18next'
import type { IUser } from '@/model/user-model'

declare global {
	namespace Express {
		export interface Response {
			success: (payload: any, msg?: string) => void,
			failed: (status: number, payload: any, msg: string) => {}
		}
		export interface Request {
			user?: IUser,			// 追加在req中的用户信息，便于后续中间件直接获取
			//! 以下是i18next-http-middleware中间件追加的属性
			i18n: i18n,				// i18next实例
			t: i18n['t'],			// 公共的语言翻译函数
			language: string,	// 当前请求的语言code 
			languages: string[],	// 可回单支持的语言code数组
			lng: string,					// 当前请求的语言code，等价于language
			locale: string,		// 当前请求的语言code，等价于language
		}
	}
}
