import { Document } from "mongoose";
export interface ICoupon extends Pick<Document, "_id"> {
  name: string;
  expire: Date;
  discount: Number;
}
