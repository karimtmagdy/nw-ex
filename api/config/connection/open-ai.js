// const { OpenAI } = require("openai/client.js");
const OpenAI = require("openai");
const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
// dangerouslyAllowBrowser: true,

// if (!OPENAI_API_KEY) {
//   console.error("No API Key found");
//   process.exit(1);
// }

module.exports = { openai };
