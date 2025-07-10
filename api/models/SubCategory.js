const { Types, Schema, model } = require("mongoose");
const slugify = require("slugify");
const SubCategorySchema = new Schema(
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
const SubCategory = model("SubCategory", SubCategorySchema);
module.exports = { SubCategory };
