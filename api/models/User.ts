import { Types, model, Schema } from "mongoose";
import slugify from "slugify";
import bcrypt from "bcryptjs";
import { gender, IUser, roles, states, status } from "../types/UserType";

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    slug: { type: String, lowercase: true, trim: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: { type: String, minlength: 6, select: false, required: true },
    age: { type: Number, sparse: true, select: false },
    name: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
    },
    gender: { type: String, enum: gender, sparse: true, select: false },
    // address: { type: String, sparse: true, select: false },
    role: { type: String, enum: roles, default: "user" },
    status: { type: String, enum: status, default: "active" },
    active: { type: String, enum: states, default: "offline" },
    photo: {
      url: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      },
      publicId: { type: String, default: null },
    },
    refreshToken: String,
    phone: { type: String, select: false, sparse: true },
    verified: { type: Boolean, default: false },
    remember: { type: Boolean, default: false, sparse: false },
    isActive: { type: Boolean, default: false },
    activeAt: { type: Date, select: false, sparse: false },
    deletedAt: { type: Date, select: false, sparse: false },
    cart: [{ type: Types.ObjectId, ref: "Cart", select: false, sparse: true }],
    permissions: { type: [String], select: false, sparse: true },
  },
  { timestamps: true, collection: "users" }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};
UserSchema.pre("save", function (next) {
  this.slug = slugify(this.username, { lower: true });
  next();
});
UserSchema.set("toJSON", {
  transform(doc, ret) {
    if (ret.role === "user") {
      delete ret.permissions;
    }
    return ret;
  },
});
UserSchema.index({ username: 1, email: 1 });
export const User = model<IUser>("User", UserSchema);
