const jwt = require("jsonwebtoken");
const { Chat } = require("../models/ChatBot");
const { fn } = require("../lib/utils");
const { VALID } = require("../lib/status/msg-status");
const { AppError } = require("../middleware/errorHandler");
const { JWT_SECRET, AUTHORIZED_ADMIN_ID } = require("../lib/local.env");
const { getDeepSeekResponse } = require("./deepseek.service");

exports.createChat = fn(async (req, res, next) => {
  const { sender, role, prompt } = req.body;
  const token = req.get("Authorization");
  
  // التحقق من وجود البيانات المطلوبة
  if (!prompt || !role) {
    return next(new AppError("Prompt and role are required", 400));
  }
  
  const decoded = jwt.verify(token, JWT_SECRET);
  if (!AUTHORIZED_ADMIN_ID.includes(decoded._id))
    return next(new AppError(VALID.admin, 403));
    
  if (!["user", "assistant", "system"].includes(role))
    return next(new AppError("Invalid role", 400));

  try {
    // الحصول على رد من DeepSeek
    const botResponse = await getDeepSeekResponse(req);

    const payload = {
      sender,
      adminId: decoded._id,
      role,
      prompt,
      response: botResponse,
    };
    
    // إنشاء الـ chat (create بيحفظ تلقائياً)
    const chat = await Chat.create(payload);
    
    res.status(201).json({ 
      success: true,
      chat,
      message: "Chat created successfully" 
    });
  } catch (error) {
    return next(new AppError("Failed to get bot response", 500));
  }
});

exports.getChat = fn(async (req, res) => {
  const { adminId, limit = 50 } = req.query;
  
  // بناء الـ filter
  const filter = {};
  if (adminId) filter.adminId = adminId;
  
  const chats = await Chat.find(filter)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .populate('adminId', 'name email');
    
  res.status(200).json({ 
    success: true,
    count: chats.length,
    chats 
  });
});

exports.getSingleChat = fn(async (req, res, next) => {
  const { id } = req.params;
  
  const chat = await Chat.findById(id).populate('adminId', 'name email');
  
  if (!chat) {
    return next(new AppError("Chat not found", 404));
  }
  
  res.status(200).json({ 
    success: true,
    chat 
  });
});