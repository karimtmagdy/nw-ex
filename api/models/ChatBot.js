const { Types, Schema, model } = require("mongoose");

const ChatBotSchema = new Schema(
  {
    adminId: { type: String, required: true },
    prompt: String,
    response: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "chatbot" }
);

const ChatBot = model("ChatBot", ChatBotSchema);
module.exports = { ChatBot };
