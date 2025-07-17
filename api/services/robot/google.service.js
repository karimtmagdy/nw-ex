const { fn } = require("../../lib/utils");
const { gemini } = require("../../config/connection/google-ai");
exports.GoogleService = fn(async (req, res) => {
  const { prompt } = req.body;
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent([prompt]);

    // console.log("response", response.response.candidates[0].content);
    res.json({ message: response.response.text() });
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({ status: error.statusText, error: error.errorDetails[1].message });
  }
});
// exports.getChats = async (req, res) => {};
// exports.getHistory = async (req, res) => {};
// exports.getSingleChat = async (req, res) => {};
