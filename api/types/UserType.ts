import { Request } from "express";
// "suspended",
import { ObjectId, Document } from "mongoose";

import { JwtPayload } from "jsonwebtoken";
export const roles = ["user", "admin", "moderator", "manager"] as const;
export type RoleType = (typeof roles)[number];
export const status = ["active", "inactive", "banned", "pending"] as const;
export type StatusType = (typeof status)[number];
export const gender = ["male", "female"] as const;
export type GenderType = (typeof gender)[number];
export const states = ["offline", "online"] as const;
export type StatesType = (typeof states)[number];
export interface ExtendedRequest extends Request {
  user: IUser;
}
export interface IUser extends Pick<Document, "_id"> {
  readonly _id: string;
  username: string;
  email: string;
  password: string;
  slug: string;
  age: number;
  name: {
    firstName: string;
    lastName: string;
  };
  refreshToken: string;
  gender: GenderType;
  status: StatusType;
  role: RoleType;
  active: StatesType;
  phone: string;
  verified: boolean;
  remember: boolean;
  isActive: boolean;
  deletedAt: Date;
  activeAt: Date;
  permissions: string[];
  cart: ObjectId;
  photo: { url: string; publicId: string };
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  // forgotPassword: String,
  // forgotPasswordExpiry: Date,
  // confirmPassword: string;
  createdAt: Date;
  updatedAt: Date;
}

// wishlist: {
//   type: string;
//   productId: string;
// }[];
// createAccessToken: () => string;
// createRefreshToken: () => string;
// createResetToken: () => string;

// orders: [{ type: Types.ObjectId, ref: "order", sparse: true }],
// resetPasswordToken: String,
// resetPasswordExpireAt: Date,

// verificationToken: String,
// verificationTokenExpireAt: Date,
// verifyOtp: { type: String, default: "" },
// verifyOtpExpireAt: { type: Number, default: 0 },
// resetOtp: { type: String, default: "" },
// resetOtpExpireAt: { type: Number, default: 0 },
// tags: [{ type: Types.ObjectId, ref: "tag", sparse: true }],
// wishlist: [{ type: Types.ObjectId, ref: "wishlist" }],
// likes: [{ type: Types.ObjectId, ref: "likes" }],
// favorite: [{ type: Types.ObjectId, ref: "favorite" }],
// permission: [{ type: Types.ObjectId, ref: "Permission" }],
export interface UserPayload extends JwtPayload {
  readonly _id: string;
  readonly email: string;
  readonly username: string;
  readonly role: RoleType;
}
// passwordChangedAt: Date;
// passwordResetToken: string;
// passwordResetExpires: Date;
// emailVerifiedAt: Date;
// emailVerificationToken: string;
// emailVerificationExpires: Date;
// emailConfirmationSentAt: Date;
// emailConfirmationToken: string;
// emailConfirmed: boolean;
