import { BrandDocument } from "../types/BrandType";
import { model, Schema } from "mongoose";
import slugify from "slugify";

const BrandSchema = new Schema<BrandDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    slug: { type: String, unique: true },
  },
  { timestamps: true, collection: "brands" }
);
BrandSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export const Brand = model<BrandDocument>("Brand", BrandSchema);
