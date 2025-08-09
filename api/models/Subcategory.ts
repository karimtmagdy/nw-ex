import { SubCategoryDocument } from "../types/SubcategoryType";
import { Types, model, Schema } from "mongoose";
import slugify from "slugify";

const SubCategorySchema = new Schema<SubCategoryDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 32,
    },
    slug: { type: String, trim: true },
    description: { type: String, trim: true, minlength: 10, maxlength: 500 },
    category: [{ type: Types.ObjectId, ref: "Category", required: true }],
  },
  { timestamps: true, collection: "subcategories" }
);

SubCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
export const SubCategory = model<SubCategoryDocument>(
  "SubCategory",
  SubCategorySchema
);
