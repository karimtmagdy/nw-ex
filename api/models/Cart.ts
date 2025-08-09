import { CartDocument } from "../types/CartType";
import { Types, model, Schema } from "mongoose";

const CartItemSchema = new Schema({
  productId: { type: Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
  color: { type: String },
  price: { type: Number },
  totalPriceAfterDiscount: { type: Number },
  totalAmount: { type: Number },
});
const CartSchema = new Schema<CartDocument>(
  {
    userId: { type: Types.ObjectId, ref: "User", unique: true, required: true },
    items: [CartItemSchema],
  },
  { timestamps: true, collection: "cart" }
);
export const Cart = model<CartDocument>("Cart", CartSchema);
