import { HydratedDocument } from "mongoose";
export type AdsPosition = "top" | "sidebar" | "footer";
export const positions = ["top", "sidebar", "footer"] as const;
export interface IAds {
  title: string;
  image: string;
  link: string;
  position: AdsPosition;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  extendedAt: Date;
  // extendedCount: number;
  slug: string;
}

export type AdsDocument = HydratedDocument<IAds>;
