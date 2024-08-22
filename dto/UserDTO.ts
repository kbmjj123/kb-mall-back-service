import { IUser } from "@/model/User";
import { Types } from "mongoose";

export class UserDTO{
	password!: string;
	/**
	 * 用户邮箱
	 * @example "kbmjj123@gmail.com"
	*/
	email!: string;
	
	role!: "user" | "admin";
	refreshToken?: string | null | undefined;
	accessToken?: string | null | undefined;
	nickName?: string | null | undefined;
	avatar?: string | null | undefined;
	address?: Types.ObjectId | null | undefined;
	loginTime?: Date | null | undefined;
	logoutTime?: Date | null | undefined;
	account?: string | null | undefined;
	
}