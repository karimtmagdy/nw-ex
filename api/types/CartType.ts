import { Document, ObjectId } from "mongoose";
import { IProduct } from "./ProductType";

export const statusCart = ["active", "completed"] as const;
export type StatusCartType = (typeof statusCart)[number];

export interface ICartItem {
  productId: IProduct;
  quantity?: number;
  color: string;
  unitPrice: number;
  // totalPriceAfterDiscount: number;
}
export interface ICart extends Pick<Document, "_id"> {
  userId: string | ObjectId;
  items: ICartItem[];
  status: StatusCartType;
  // totalAmount: number;
}
