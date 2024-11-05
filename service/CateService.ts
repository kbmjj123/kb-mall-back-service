import { CateDTO } from "../dto/CateDTO";
import { CateModel } from "../models/CateModel";
import { BaseService } from "./base/BaseService";

export class CateService extends BaseService<CateDTO> {
	constructor(){
		super(CateModel)
		
	}
}