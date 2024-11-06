import { ProductDTO } from "../dto/ProductDTO";
import { ProductModel } from "../models/ProductModel";
import { BaseService } from "./base/BaseService";

export class ProductService extends BaseService<ProductDTO> {
	constructor() {
		super(ProductModel)
	}
}