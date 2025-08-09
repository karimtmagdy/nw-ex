import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
export const uploadDir = path.resolve(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export const sendFile = (req: any, res: any) => {
  const filePath = path.join(__dirname, uploadDir, req.url);
  const file = fs.createReadStream(filePath);
  file.pipe(res);
};
