import { Document, ObjectId } from "mongoose";

export interface ITransaction extends Pick<Document, "_id"> {
  orderId: ObjectId;
  userId: ObjectId;
  method: "paypal" | "stripe" | "cod";
  amount: string;
  status: "paid" | "refunded" | "failed";
  date: Date;
}
