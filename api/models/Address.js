const { Types, Schema, model } = require("mongoose");

const AddressSchema = new Schema(
  {},
  { timestamps: true, collection: "address" }
);

const Address = model("Address", AddressSchema);
module.exports = { Address };
// address_line: { type: String, default: "" },
// city: { type: String, default: "" },
// state: { type: String, default: "" },
// pin_code: { type: String },
// country: { type: String },
// mobile: { type: Number, default: null },
// status: { type: Boolean, default: true },
