const { model, Types, Schema } = require("mongoose");

// 1. Message Schema
const MessageSchema = new Schema({});

// 2. Chat Session Schema
const ChatSessionSchema = new Schema({});

const Message = model("Message", MessageSchema);
const ChatSession = model("ChatSession", ChatSessionSchema);

module.exports = { Message, ChatSession };
// const { Types, Schema, model } = require("mongoose");
// const roles = ["user", "assistant", "system"];
// const modelName = ["", "", "deepseek/deepseek-r1:free"];
// const ChatSchema = new Schema(
//   {
//     role: { type: String, enum: roles, required: true },
//     // content: { type: String, required: true },
//     prompt: { type: String, required: true, trim: true },
//     response: { type: String, trim: true },
//     sender: { type: String, trim: true },
//     adminId: { type: Types.ObjectId, ref: "User", required: true },
//     canUseBot: { type: Boolean, default: false },
//     tokens: { type: Number, default: 0 },
//     model: { type: String, default: modelName[0], enum: modelName },
//     error: { type: String },
//     finish_reason: { type: String },
//   },
//   { timestamps: true, collection: "chat" }
// );

// ChatSchema.index({ adminId: 1, createdAt: -1 });

// const Chat = model("Chat", ChatSchema);
// module.exports = { Chat };