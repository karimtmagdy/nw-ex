const { Types, Schema, model } = require("mongoose");
const OrderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User" },
    products: [{ type: Types.ObjectId, ref: "Product" }],
    total: { type: Number, default: 0 },
    status: { type: String, default: "pending" },
    payment_method: { type: String, default: "cash" },
    payment_status: { type: String, default: "pending" },
    address: { type: String, default: "" },
    address2: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
    country: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  { timestamps: true, collection: "orders" }
);

const Order = model("Order", OrderSchema);
module.exports = { Order };
//   userId: { type: Types.ObjectId, ref: "User" },
//     status: { type: String, enum: ["completed", "cancel"], default: "active" },
//     orderId: { type: String, required: [true, ""], unique: true },
//     productId: { type: Types.ObjectId, ref: "Product" },
//     product_details: { type: Object, name: String, _id: String, images: Array },
//     paymentId: { type: String, default: "" },
//     payment_status: { type: String, default: "" },
//     delivery_address: { type: Types.ObjectId, ref: "Address" },
//     subTotalAmt: { type: Number, default: "" },
//     invoice_receipt: { type: String, default: "" },
//     delivery_date: { type: Date, default: "" },
//     delivery_time: { type: String, default: "" },
//     delivery_status: { type: String, enum: ["pending", "delivered"], default: "pending" },
