const { fn } = require("../lib/utils");
const { DEEPSEEK_API_KEY, DEEPSEEK_API_URL } = require("../lib/local.env");

exports.getDeepSeekResponse = fn(async (req, res) => {
  const { prompt } = req.body;
try {
    const messages = [{ role: "user", content: prompt }];
  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "My Chatbot",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1:free",
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });
  const data = await response.json();
 
  const replay = data.choices[0].message.content;
  // console.log("replay", replay);
  console.log(response)
  res.json({ replay });
  // if (!data.choices || !data.choices[0] || !data.choices[0].message) {
  //   throw new Error("Invalid response from DeepSeek API");
  // }
  console.log("response", data);
  // console.log("data", data);
  // return  data.choices[0].message.content;
} catch (error) {
  //user_id: user_2zBWhvhefToAUVjTYmiwBwaXwK6
  console.error("Error:", {
    message: error.message,
    // stack: error.stack,
  });
}
});
