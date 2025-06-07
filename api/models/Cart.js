const { Types, Schema, model } = require("mongoose");
const CartSchema = new Schema({}, { timestamps: true, collection: "carts" });

const Cart = model("Cart", CartSchema);
module.exports = { Cart };
