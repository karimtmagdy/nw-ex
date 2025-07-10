const { Schema, model } = require("mongoose");
const slugify = require("slugify");
const { CATEGORY_STATUS } = require("../lib/status/category-status");

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    slug: { type: String, unique: true, trim: true },
    status: {
      type: String,
      trim: true,
      enum: Object.values(CATEGORY_STATUS),
      default: CATEGORY_STATUS.ACTIVE,
    },
  },
  { timestamps: true, collection: "categories" }
);
CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Category = model("Category", CategorySchema);

module.exports = { Category };
