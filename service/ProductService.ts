import { FilterQuery } from "mongoose";
import { ProductDTO } from "../dto/ProductDTO";
import { ProductModel } from "../models/ProductModel";
import { BaseService } from "./base/BaseService";
import { Request as ExpressRequest } from 'express'

export class ProductService extends BaseService<ProductDTO> {
	constructor() {
		super(ProductModel)
	}

}