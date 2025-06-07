const { Types, Schema, model } = require("mongoose");
const slugify = require("slugify");

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      minlength: 20,
      maxlength: 1000,
    },
    image: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true, collection: "brands" }
);
BrandSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Brand = model("Brand", BrandSchema);

module.exports = { Brand };
