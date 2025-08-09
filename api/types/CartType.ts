import { HydratedDocument, Schema } from "mongoose";

export interface ICartItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
  color: string;
  price: number;
  totalPriceAfterDiscount: number;
  totalAmount: number;
}
export interface ICart {
  userId: Schema.Types.ObjectId;
  items: ICartItem[];
}

export type CartDocument = HydratedDocument<ICart>;
