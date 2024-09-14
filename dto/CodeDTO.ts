import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";

export interface CodeDTO extends ISoftDeleteDTO{
	isUsed?: boolean;
	content?: string | null | undefined;
	codeType?: "register" | "reset-pwd" | null | undefined;
}