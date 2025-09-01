import { Document, ObjectId } from "mongoose";
export enum StatusProductType {
  "draft",
  "published",
  "archived",
  "discontinued",
}
[];

export interface IProduct extends Pick<Document, "_id"> {
  name: string;
  description: string;
  price: number;
  status: "draft" | "published" | "archived";
  sku: string;
  colors: string[];
  slug: string;
  cover: string;
  sold: number;
  images: string[];
  discount: number;
  quantity: number;
  rating: number;
  PriceAfterDiscount: number;
  tags: string[];
  // isActive: boolean;
  views: number;
  published: boolean;
  inStock: boolean;
  featured: boolean;
  category: ObjectId[];
  subcategory: ObjectId[];
  brand: ObjectId;
  reviews: ObjectId[];
  likes: number;
}
// deletedAt: Date;
