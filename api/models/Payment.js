const { Types, Schema, model } = require("mongoose");

const PaymentSchema = new Schema(
  {},
  { timestamps: true, collection: "payments" }
);

const Payment = model("Payment", PaymentSchema);
module.exports = { Payment };
