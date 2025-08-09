import { CategoryDocument } from "../types/CategoryType";
import { model, Schema } from "mongoose";
import slugify from "slugify";

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    slug: { type: String, unique: true, trim: true },
    status: {
      type: String,
      trim: true,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
  },
  { timestamps: true, collection: "categories" }
);
CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export const Category = model<CategoryDocument>("Category", CategorySchema);
