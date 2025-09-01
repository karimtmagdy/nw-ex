import { IBrand } from "../types/BrandType";
import { model, Schema } from "mongoose";
import slugify from "slugify";

const BrandSchema = new Schema<IBrand>(
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
    description: { type: String ,minlength: 20, maxlength: 1000},
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

export const Brand = model<IBrand>("Brand", BrandSchema);
