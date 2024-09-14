import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";

export interface AddressDTO extends ISoftDeleteDTO{
	isDefault: boolean;
	provinceCode: string;
	provinceName: string;
	cityCode: string;
	cityName: string;
	areaName: string;
	areaCode: string;
	detailAddress: string;

}