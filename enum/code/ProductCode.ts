/**
 * 商品、分类、品牌模块-20开头
*/
export enum ProductCode{
	/**
	 * 商品不存在
	*/
	PRODUCT_NO_EXIST = 200001,
	/**
	 * 商品库存不足
	*/
	PRODUCT_NO_STOCK = 200002,
	/**
	 * 分类错误
	*/
	PRODUCT_CATE_ERROR = 200003,
	/************ 以下是品牌的相关错误编码 **************/
	/**
	 * 品牌名称已存在
	*/
	BRAND_ALREADY_EXIST = 200101,
	/**
	 * 品牌不存在
	*/
	BRAND_NO_EXIST = 200102,
	/**
	 * Slug已存在
	*/
	SLUG_ALREADY_EXIST = 200103,
	/**
	 * 需传递有效的商品价格
	*/
	PRODUCT_NEED_PRICE = 200104,
	/**
	 * 需传递有效的商品slug
	*/
	PRODUCT_NEED_SLUG = 200105,
	
	/************ 以下是分类的相关错误编码 **************/
	/**
	 * 分类名称已存在
	*/
	CATE_ALREADY_EXIST = 300101,
	/**
	 * 分类不存在
	*/
	CATE_NO_EXIST = 200102,

	/************ 以下是评价的相关错误编码 **************/
}