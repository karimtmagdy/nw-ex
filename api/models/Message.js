const { model, Types, Schema } = require("mongoose");

const messageSchema = new Schema({
  role: {
    type: String,
    enum: ["user", "assistant", "system"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  conversationId: {
    type: String,
    // required: true,
  },
});
const Message = model("Message", messageSchema);
module.exports = { Message };
