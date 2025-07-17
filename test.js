// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // 1. Message Schema
// const MessageSchema = new Schema({
//   sender: {
//     type: String, // 'user' or 'ai'
//     required: true,
//     enum: ["user", "ai"], // Ensures sender is either 'user' or 'ai'
//   },
//   content: {
//     type: String,
//     required: true,
//     trim: true, // Removes whitespace from both ends of a string
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now, // Automatically sets the current date/time
//   },
//   // Optional: If you want to store AI model's specific response metadata
//   aiMetadata: {
//     modelUsed: String, // e.g., 'GPT-3.5', 'Gemini-Pro'
//     promptTokens: Number,
//     completionTokens: Number,
//     totalTokens: Number,
//     // Add more AI-specific fields as needed
//   },
// });

// // 2. Chat Session Schema
// const ChatSessionSchema = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId, // Link to a User model if you have one
//     ref: "User", // Reference to a 'User' model (assuming you have one)
//     // required: true
//   },
//   title: {
//     type: String,
//     default: "New Chat Session", // Default title for a new session
//     trim: true,
//   },
//   messages: [MessageSchema], // Array of MessageSchema embedded directly
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   // Optional: To store context or initial prompt for the AI model
//   initialContext: {
//     type: String,
//     trim: true,
//   },
//   // Optional: Status of the chat session (e.g., 'active', 'archived', 'deleted')
//   status: {
//     type: String,
//     enum: ["active", "archived", "deleted"],
//     default: "active",
//   },
// });

// // Middleware to update `updatedAt` field on every save
// ChatSessionSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// // Create the Mongoose models
// const Message = mongoose.model("Message", MessageSchema);
// const ChatSession = mongoose.model("ChatSession", ChatSessionSchema);

// module.exports = { Message, ChatSession };

// const mongoose = require("mongoose");
// const { ChatSession } = require("./models/ChatAI");

// mongoose
//   .connect("mongodb://localhost:27017/chat", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { userId, title, initialContext } = req.body;
//     const newChat = new ChatSession({ userId, title, initialContext });
//     await newChat.save();
//     res.status(201).json(newChat);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Example: Route to add a message to a chat session
// app.post("/api/chat/:chatId/messages", async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const { sender, content, aiMetadata } = req.body;

//     const chat = await ChatSession.findById(chatId);
//     if (!chat) {
//       return res.status(404).json({ message: "Chat session not found" });
//     }

//     chat.messages.push({ sender, content, aiMetadata });
//     await chat.save(); // This will also trigger the `updatedAt` pre-save hook
//     res.status(201).json(chat);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Example: Route to get all messages for a chat session
// app.get("/api/chat/:chatId/messages", async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const chat = await ChatSession.findById(chatId).select("messages"); // Only retrieve messages
//     if (!chat) {
//       return res.status(404).json({ message: "Chat session not found" });
//     }
//     res.status(200).json(chat.messages);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Start the server
