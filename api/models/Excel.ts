import { Types, model, Schema } from "mongoose";
import slugify from "slugify";
export interface AddressDocument extends Document {}
const ExcelSchema = new Schema({}, { timestamps: true, collection: "excel" });

export const Excel = model("Excel", ExcelSchema);
