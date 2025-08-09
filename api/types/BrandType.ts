import { HydratedDocument } from "mongoose";
export interface IBrand {
  name: string;
  image: string;
  isActive: boolean;
  status?: string;
  slug?: string;
}
export type BrandDocument = HydratedDocument<IBrand>;
