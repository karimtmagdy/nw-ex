import { Request } from "express";
import { modelGoggle } from "../../config/connections/google-ai";
import { GoogleGenAIResponse } from "@/types/ChatAIType";
export const GoogleService = async (
  req: Request
): Promise<GoogleGenAIResponse> => {
  const { prompt } = req.body;
  const aiResponseGoogle = await modelGoggle.generateContent(prompt);
  return aiResponseGoogle.response as Object as GoogleGenAIResponse;
  // res.status(500).json({ status: error.statusText, error: error.errorDetails[1].message });
};
