import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY, GEMINI_MODEL_FLASH } from "../../lib/env-local";

const clientGemini = new GoogleGenerativeAI(GEMINI_API_KEY as string);
export const modelGoggle = clientGemini.getGenerativeModel({
  model: GEMINI_MODEL_FLASH as string,
});
if (!GEMINI_API_KEY) {
  console.error("No API Key found");
  process.exit(1);
}
// app.post("/get", upload.single("file"), async (req, res) => {
//   const { prompt } = req.body;
//   const { file } = req;
//   try {
//     const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
//     if (file) {
//       const fileData = fs.readFileSync(file.path);
//       const image = {
//         inlineData: {
//           data: fileData.toString("base64"),
//           name: file.originalname,
//           mimeType: file.mimetype,
//         },
//       };
//       prompt.push(image);
//     }
//     const response = await model.generateContent(prompt);
//     res.json({ message: response.response.text(), model });
//   } catch (error) {
//     res.status(500).send({ error });
//   } finally {
//     if (file) {
//       fs.unlinkSync(file.path);
//     }
//   }
// });

// app.use((req, res, next) => {
//   req.gemini = gemini;
//   next();
// });

// if(process.env.GEMINI_API_KEY){
//   const gemini = new GoogleGenerativeAI({
//     apiKey: process.env.GEMINI_API_KEY,
//   });
//   app.use((req, res, next) => {
//     req.gemini = gemini;
//     next();
//   });
// }
