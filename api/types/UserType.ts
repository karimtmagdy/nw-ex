import { HydratedDocument, Schema, Document } from "mongoose";
export const roles = ["user", "admin", "moderator", "manager"] as const;
export const status = [
  "active",
  "inactive",
  "banned",
  "suspended",
  "pending",
  "deleted",
] as const;

export type RoleType = (typeof roles)[number];
export type StatusType = (typeof status)[number];

export interface IUser extends Document {
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
  gender: string;
   refreshToken: string;
  status: StatusType;
  role: RoleType;
  phone: string;
  verified: boolean;
  rememberMe: boolean;
  active: "offline" | "online";
  isActive: boolean;
  deletedAt: Date;
  activeAt: Date;
  permissions: string[];
  cart: Schema.Types.ObjectId;
  photo: { url: string; publicId: string };
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  // forgotPassword: String,
  // forgotPasswordExpiry: Date,
  // confirmPassword: string;
}
  // cart: {
  //   type: string;
  //   productId: string;
  // }[];
  // wishlist: {
  //   type: string;
  //   productId: string;
  // }[];
  // createAccessToken: () => string;
  // createRefreshToken: () => string;
  // createResetToken: () => string;
export type UserDocument = HydratedDocument<IUser>;
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
export interface UserPayload extends IUser {
  readonly _id: string;
  readonly email: string;
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