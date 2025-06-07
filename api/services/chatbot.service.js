const { fn } = require("../lib/utils");
const axios = require("axios");
const { openai } = require("../utils/openai");

exports.chatBot = fn(async (req, res, next) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt is required" });
  const adminId = req.user?.id;
  const allowedAdminId = process.env.AUTHORIZED_ADMIN_ID;
  if (adminId !== allowedAdminId)
    return res
      .status(403)
      .json({ error: "You are not allowed to use this chat" });
  console.log(adminId, allowedAdminId);
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      user: adminId,

      messages: [
        {
          role: "system",
          content:
            "أنت مساعد إداري ذكي تحلل واجهات المواقع وتنصح الأدمن بكيفية تحسينها",
        },
        { role: "admin", content: prompt },
      ],
    });
    const message = completion.choices[0].message.content;
    //
    const response = await axios.post(
      "/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json({ message: response.data.choices[0].message });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "An error occurred while connecting to OpenAI" });
  }
});
