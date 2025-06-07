const { Types, Schema, model } = require("mongoose");
const slugify = require("slugify");

const ProductSchema = new Schema({
  status: {
    type: String,
    trim: true,
    enum: ["active", "inactive"],
    default: "active",
  },

  currency: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 3,
    enum: {
      values: ["USD", "EUR", "GBP", "INR", "EGP", "SAR"],
      message: "Invalid currency format",
    },
    default: "USD",
  },

  tags: [String],

  // sizes: [String],

  Internal: { type: Boolean, default: true },

  ratings_count: { type: Number, default: 0 },
  ratings_average: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },

  more_details: { type: Object, default: {} },
  unit: { type: String, default: "", sparse: false },
  // favorite: {},
  // wishlist: {},
  // cart: {},
  // views: { type: Number, default: 0 },
  // likes: { type: Number, default: 0 },
  // comments: { type: Number, default: 0 },
  // shares: { type: Number, default: 0 },
  // created_by: [{ type: Types.ObjectId, ref: "User", required: true }],

  reviews: [{ type: Types.ObjectId, ref: "Review" }],
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
