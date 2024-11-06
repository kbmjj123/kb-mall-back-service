import { EvaluateDto } from "../dto/EvaluateDTO";
import { EvaluateModel } from "../models/EvaluateModel";
import { BaseService } from "./base/BaseService";

export class EvaluateService extends BaseService<EvaluateDto>{
	constructor(){
		super(EvaluateModel)
	}
}