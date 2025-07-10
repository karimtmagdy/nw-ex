const { Types, Schema, model } = require("mongoose");
const slugify = require("slugify");
const { PRODUCT_STATUS } = require("../lib/status/product-status");

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
    description: { type: String, trim: true, minlength: 20, maxlength: 1000 },
    price: { type: Number, required: true, trim: true, min: 1, max: 200000 },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.DRAFT,
      required: true,
    },
    sku: { type: String, unique: true },
    colors: [String],
    slug: { type: String, trim: true, unique: true },
    cover: { type: String, default: "https://ui.shadcn.com/placeholder.svg" },
    sold: { type: Number, default: 0 },
    images: [{ type: Array, default: [String] }],
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      sparse: true,
      select: false,
    },
    quantity: { type: Number, default: 0, required: true },
    published: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    PriceAfterDiscount: Number,
    tags: [String],
    // views: { type: Number, default: 0 },
    // likes: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    category: [{ type: Types.ObjectId, ref: "Category" }],
    subcategory: [{ type: Types.ObjectId, ref: "SubCategory" }],
    brand: [{ type: Types.ObjectId, ref: "Brand" }],
    reviews: [{ type: Types.ObjectId, ref: "Review" }],

    // currency: {
    //   type: String,
    //   trim: true,
    //   minlength: 3,
    //   maxlength: 3,
    //   enum: {
    //     values: ["USD", "EUR", "GBP", "INR", "EGP", "SAR"],
    //     message: "Invalid currency format",
    //   },
    //   default: "USD",
    // },
    // sizes: [String],
    // Internal: { type: Boolean, default: true },
    // ratings_count: { type: Number, default: 0 },
    // ratings_average: { type: Number, default: 0 },
    // more_details: { type: Object, default: {} },
    // unit: { type: String, default: "", sparse: false },
    // favorite: {},
    // wishlist: {},
    // cart: {},
    // comments: { type: Number, default: 0 },
    // shares: { type: Number, default: 0 },
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
ProductSchema.pre("save", function (next) {
  if (!this.sku) {
    this.sku = `${this.name.slice(0, 3).toUpperCase()}-${Date.now()}`;
  }
  next();
});
const Product = model("Product", ProductSchema);

module.exports = { Product };
// productSchema.virtual("averageRating").get(function () {
//   return this.ratings_average;
// });

// productSchema.virtual("totalRatings").get(function () {
//   return this.ratings_count;
// });

// productSchema.set("toJSON", {
//   versionKey: false,
//   transform: function (doc, ret) {
//     delete ret._id;
//   },
// });
// productSchema.set("toObject", {
//   versionKey: false,
//   transform: function (doc, ret) {
//     delete ret._id;
//     return ret;
//   },
// });
