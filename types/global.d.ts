import { Server } from "http";

declare global{
	var server: Server;	// 生命全局server变量
	var appendHeaders: Record<string, any>
}