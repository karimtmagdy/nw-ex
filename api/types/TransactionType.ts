import { HydratedDocument, Schema } from "mongoose";

export interface ITransaction {
  orderId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  method: "paypal" | "stripe" | "cod";
  amount: string;
  status: "paid" | "refunded" | "failed";
  date: Date;
}
export type TransactionDocument = HydratedDocument<ITransaction>;
