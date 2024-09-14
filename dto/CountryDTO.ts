import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";

export interface CountryDTO extends ISoftDeleteDTO{
	en: string,
	cn: string,
	code: string
}