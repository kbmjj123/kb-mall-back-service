import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";

export interface AddressDTO extends ISoftDeleteDTO{

	/**
	 * 收件人姓名
	*/
	fullName: string,
	/**
	 * 收件人手机号码
	*/
	phone: string,
	/**
	 * 收件人邮件
	*/
	email: string,
	/**
	 * 国家/地区代码，建议使用 ISO 3166-1 标准（如 US、CN）
	*/
	country: string,
	/**
	 * 省/州/地区名称，长度限制一般为 1-100 字符
	*/
	state: string,
	/**
	 * 城市名称，长度限制一般为 1-100 字符
	*/
	city: string,
	/**
	 * 区
	*/
	district: string,
	/**
	 * 街道地址一
	*/
	streetAddressLine1: string,
	/**
	 * 街道地址二
	*/
	streetAddressLine2: string,
	/**
	 * 邮编
	*/
	postalCode: string,
	/**
	 * 是否默认的标识
	*/
	isDefault: boolean,
	/**
	 * 用户id
	*/
	userId: string
}
