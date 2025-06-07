const { Types, Schema, model } = require("mongoose");
const slugify = require("slugify");
const STATUS = Object.freeze({
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
});
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      minlength: 20,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
      max: 1000000,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.DRAFT,
    },
    colors: [String],
    slug: { type: String, trim: true, index: true, unique: true },
    cover: { type: String },
    sold: { type: Number, default: 0 },
    images: [{ type: Array, default: [String] }],
    discount: { type: Number, default: 0, min: 0, max: 100, sparse: true },
    quantity: { type: Number, default: 0, required: true },
    draft: { type: Boolean, default: true },
    published: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },

    category: [{ type: Types.ObjectId, ref: "Category" }],
    subcategory: [{ type: Types.ObjectId, ref: "SubCategory" }],
    brand: [{ type: Types.ObjectId, ref: "Brand" }],
  },
  { timestamps: true, collection: "products" }
);
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
ProductSchema.virtual("stock").get(function () {
  return this.quantity > 0 ? "in stock" : "out of stock";
});
const Product = model("Product", ProductSchema);

module.exports = { Product };
