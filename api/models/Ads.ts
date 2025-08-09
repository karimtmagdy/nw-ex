import { AdsDocument, positions } from "../types/AdsType";
import { model, Schema } from "mongoose";
import slugify from "slugify";

const AdsSchema = new Schema<AdsDocument>(
  {
    title: String,
    image: String,
    link: String,
    position: {
      type: String,
      enum: positions,
      default: "top",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    extendedAt: { type: Date },
    // extendedCount: { type: Number, default: 0 },
    slug: { type: String, lowercase: true, trim: true },
  },
  { timestamps: true }
);
AdsSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
export const Ads = model<AdsDocument>("Ads", AdsSchema);
