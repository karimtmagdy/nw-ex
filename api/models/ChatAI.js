const { model, Types, Schema } = require("mongoose");

// 1. Message Schema
const MessageSchema = new Schema({});

// 2. Chat Session Schema
const ChatSessionSchema = new Schema({});

const Message = model("Message", MessageSchema);
const ChatSession = model("ChatSession", ChatSessionSchema);

module.exports = { Message, ChatSession };
