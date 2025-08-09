import { Types, model, Schema } from "mongoose";
import slugify from "slugify";
export interface AddressDocument extends Document {}
const OrderSchema = new Schema(
  {
    customerId: { type: Types.ObjectId, ref: "User" },
    productId: [{ type: Types.ObjectId, ref: "Product" }],
    totalQty: { type: Number, default: 0 },

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
    status: {
      type: String,
      trim: true,
      enum: [
        "pending",
        "shipped",
        "out_for_delivery",
        "confirmed",
        "processing",
        "delivered",
        "cancelled",
        "refunded",
        "returned",
      ],
    },
  },
  { timestamps: true, collection: "orders" }
);

export const Order = model("Order", OrderSchema);

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
