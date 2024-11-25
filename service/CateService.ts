import { FilterQuery } from "mongoose";
import { CateDTO } from "../dto/CateDTO";
import { CateModel } from "../models/CateModel";
import { BaseService } from "./base/BaseService";
import { Request as ExpressRequest } from 'express'

export class CateService extends BaseService<CateDTO> {
	constructor(){
		super(CateModel)
	}

}