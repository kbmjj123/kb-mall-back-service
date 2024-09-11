
export interface CodeDTO {
	isUsed?: boolean;
	content?: string | null | undefined;
	codeType?: "register" | "reset-pwd" | null | undefined;
}