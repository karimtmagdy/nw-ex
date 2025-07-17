const { Schema, Types, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
const {
  USER_ROLES,
  USER_STATUS,
  ONLINE_STATUS,
} = require("../lib/status/user-status");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
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
    gender: {
      type: String,
      enum: ["male", "female"],
      sparse: true,
      select: false,
    },
    photo: {
      url: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      },
      publicId: { type: String, default: null },
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    isActive: {
      type: String,
      enum: Object.values(ONLINE_STATUS),
      default: ONLINE_STATUS.OFFLINE,
    },
    refreshToken: String,
    phone: { type: String, default: null, select: false, sparse: true },
    verified: { type: Boolean, default: false },
    rememberMe: { type: Boolean, default: false, sparse: true },
    active: { type: Boolean, default: false },
    activeAt: { type: Date, select: false, sparse: true },
    deletedAt: { type: Date, select: false, sparse: true },
    cart: [{ type: Types.ObjectId, ref: "cart", sparse: true }],
  },
  { timestamps: true, collection: "users" }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
UserSchema.pre("save", function (next) {
  this.slug = slugify(this.username, { lower: true });
  next();
});
UserSchema.index({ username: 1, email: 1 });
const User = model("User", UserSchema);
module.exports = { User };

// orders: [{ type: Types.ObjectId, ref: "order", sparse: true }],
// resetPasswordToken: String,
// resetPasswordExpireAt: Date,
// forgotPassword: String,
// forgotPasswordExpiry: Date,
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
