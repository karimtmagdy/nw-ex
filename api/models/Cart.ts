import { ICart, ICartItem, statusCart } from "../types/CartType";
import { Types, model, Schema } from "mongoose";

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    color: { type: String },
    unitPrice: { type: Number },
    // totalPriceAfterDiscount: { type: Number },
  },
  { _id: false }
);
const CartSchema = new Schema<ICart>(
  {
    userId: { type: Types.ObjectId, ref: "User", unique: true },
    items: [CartItemSchema],
    // totalAmount: { type: Number, required: true },
    status: { type: String, enum: statusCart, default: "active" },
  },
  { timestamps: true, collection: "cart" }
);
// const Carts = new Schema(
//   {
//     cartItems: [
//       {
//         productId: { type: Types.ObjectId, ref: "Product", required: true },
//         quantity: { type: Number, default: 1 },
//         color: { type: String },
//       },
//     ],
//     totalCartPrice: Number,
//     totalPriceAfterDiscount: Number,
//     userId: { type: Types.ObjectId, ref: "User", unique: true, required: true },
//   },
//   { timestamps: true, collection: "cart" }
// );
export const Cart = model<ICart>("Cart", CartSchema);
