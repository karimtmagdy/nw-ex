import { Request, Response } from "express";
import fs from "fs";
import XLSX from "xlsx";
// const upload = require("../config/multer");

export const uploadExcelSheet = (req:Request, res:Response) => {
  const filePath = req.file.path;
  // const readFiles = upload.single("file");

  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: "", // set default value for empty cells
    });
    fs.unlinkSync(filePath); // delete the uploaded file after processing
    res.json({ data: jsonData });
  } catch (err) {
    res.status(500).json({ error: "Failed to process Excel file" });
  }
};
// app.post("/upload-excel", upload.single("file"), (req, res) => {});
