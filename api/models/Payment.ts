import { Types, model, Schema } from "mongoose";
export interface AddressDocument extends Document {}
const PaymentSchema = new Schema(
  {},
  { timestamps: true, collection: "payments" }
);

export const Payment = model("Payment", PaymentSchema);
