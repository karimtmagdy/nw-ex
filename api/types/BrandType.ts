import { Document, Types } from "mongoose";

export interface IBrand extends Pick<Document, "_id"> {
  name: string;
  image: string;
  status: "active" | "inactive";
  slug: string;
  isActive: boolean;
  description: string;
}

export interface IBrandDocument extends IBrand {
  _id: Types.ObjectId;
}
