import { Document } from "mongoose";

export interface ICategory extends Pick<Document, "_id"> {
  _id: string;
  name: string;
  image: string;
  isActive: boolean;
  slug: string;
  status: string;
}
