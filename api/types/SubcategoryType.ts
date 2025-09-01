import { ObjectId, Document } from "mongoose";
export interface ISubCategory extends Pick<Document, "_id"> {
  name: string;
  slug: string;
  description: string;
  category: ObjectId[];
}
