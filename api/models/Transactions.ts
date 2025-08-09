import { Types, model, Schema } from "mongoose";
import { type TransactionDocument } from "../types/TransactionType";

const TransactionSchema = new Schema<TransactionDocument>({
  orderId: { type: Types.ObjectId, ref: "Order", required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true },
  method: { type: String, enum: ["paypal", "stripe", "cod"], required: true },
  amount: { type: String, required: true },
  status: {
    type: String,
    enum: ["paid", "refunded", "failed"],
    required: true,
  },
  date: { type: Date, default: Date.now },
});

export const Transaction = model<TransactionDocument>(
  "Transaction",
  TransactionSchema
);
