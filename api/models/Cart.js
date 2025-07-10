const { Types, Schema, model } = require("mongoose");
const CartSchema = new Schema(
  {
    productId: { type: Types.ObjectId, ref: "Product" },
    userId: { type: Types.ObjectId, ref: "User" },
    quantity: { type: Number, default: 1 },
    color: String,
    price: Number,
    totalPriceAfterDiscount: Number,
    totalAmount: Number,
  },
  { timestamps: true, collection: "cart" }
);

const Cart = model("Cart", CartSchema);
module.exports = { Cart };
