import mongoose from "mongoose";
import { CarDTO } from "../dto/CarDTO";

const CAR_MODEL_NAME = 'shoppingCarModel'
const carSchema = new mongoose.Schema<CarDTO>({

})

export const ShoppingCarModel = mongoose.model(CAR_MODEL_NAME, carSchema)