import { Types, model, Schema ,Document} from "mongoose";
import slugify from "slugify";

export interface AddressDocument extends Document {}
const AddressSchema = new Schema(
  {},
  { timestamps: true, collection: "address" }
);

export const Address = model("Address", AddressSchema);

// address_line: { type: String, default: "" },
// city: { type: String, default: "" },
// state: { type: String, default: "" },
// pin_code: { type: String },
// country: { type: String },
// mobile: { type: Number, default: null },
// status: { type: Boolean, default: true },
