const { Types, Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    username: String,
    email: String,
    role: { type: String, default: "admin" },
    canUseBot: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "admin" }
);

const Admin = model("Admin", adminSchema);
module.exports = { Admin };
