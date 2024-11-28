import { CollectionDTO } from "../dto/CollectionDTO";
import { CollectionModel } from "../models/CollectionModel";
import { BaseService } from "./base/BaseService";

export class CollectionService extends BaseService<CollectionDTO>{
	constructor(){
		super(CollectionModel)
	}
}