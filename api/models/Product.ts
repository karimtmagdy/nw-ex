import { IProduct } from "../types/ProductType";
import { Types, model, Schema } from "mongoose";
import slugify from "slugify";

const ProductSchema = new Schema<IProduct>(
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
    price: { type: Number, required: true, trim: true, min: 0, max: 200000 },
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
    // isActive: { type: Boolean, default: true },
    published: { type: Boolean, default: false },
    quantity: { type: Number, default: 0, required: true },
    inStock: { type: Boolean, default: true, sparse: false, select: false },
    featured: { type: Boolean, default: false, sparse: false, select: false },
    rating: { type: Number, default: 0, min: 1, max: 5 },
    PriceAfterDiscount: Number,
    category: [{ type: Types.ObjectId, ref: "Category" }],
    subcategory: [{ type: Types.ObjectId, ref: "SubCategory" }],
    brand: { type: Types.ObjectId, ref: "Brand", required: true },
    reviews: [{ type: Types.ObjectId, ref: "Review" }],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      //   required: true,
    },
    tags: [String],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
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
export const Product = model<IProduct>("Product", ProductSchema);

// productSchema.virtual("averageRating").get(function () {
//   return this.ratings_average;
// });

// productSchema.virtual("totalRatings").get(function () {
//   return this.ratings_count;
// });
// productSchema.set("toObject", {
// productSchema.set("toJSON", {
//   versionKey: false,
//   transform: function (doc, ret) {
//     delete ret._id;
//   },
// });
