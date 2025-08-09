import { HydratedDocument, Schema } from "mongoose";
export interface ISubCategory {
  name: string;
  slug: string;
  description: string;
  category: Schema.Types.ObjectId[];
}

export type SubCategoryDocument = HydratedDocument<ISubCategory>;
