const { Types, Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    // username: String,
    // email: String,
    // password: String,
    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },
    content: { type: String, required: true },
    // canUseBot: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "admin" }
);

const Admin = model("Admin", adminSchema);
module.exports = { Admin };
