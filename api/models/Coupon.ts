import { ICoupon } from "../types/CouponType";
import { model, Schema } from "mongoose";

const CouponSchema = new Schema<ICoupon>(
  {
    name: { type: String, trim: true, required: true, unique: true },
    expire: { type: Date, required: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true, collection: "coupons" }
);

export const Coupon = model<ICoupon>("Coupon", CouponSchema);
