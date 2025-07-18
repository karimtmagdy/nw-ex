const { openai } = require("../../config/integrations/open-ai");
const { OPENAI_API_KEY, OPENAI_ORG_ID } = process.env;
exports.OpenAIService = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      // const response = await client.responses.create({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Organization:": OPENAI_ORG_ID,
      },
      model: "gpt-3.5-turbo",
      input: "Write a one-sentence bedtime story about a unicorn.",
      messages: [{ role: "user", content: req.body.prompt }],
      prompt: req.body.prompt,
      temperature: 0.7,
      // max_tokens: 256,
      // top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.json({ message: response.output_text });
    const data = response.data?.choices[0].message.content;
    // const data = response.data?.choices[0].message.text;
    res.json({ message: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
