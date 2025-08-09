import { HydratedDocument } from "mongoose";

export interface ICategory {
  name: string;
  image: string;
  isActive: boolean;
  slug: string;
  status: string;
}
export type CategoryDocument = HydratedDocument<ICategory>;
