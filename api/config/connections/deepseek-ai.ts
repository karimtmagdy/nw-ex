import { DEEPSEEK_API_KEY, DEEPSEEK_API_URL } from "../../lib/env-local";

export const clientDeepseek = {
  url: DEEPSEEK_API_URL as string,
  api_key: DEEPSEEK_API_KEY as string,
};

if (!DEEPSEEK_API_KEY) {
  console.error("No API Key found");
  process.exit(1);
}

if (!DEEPSEEK_API_URL) {
  console.error("No API URL found");
  process.exit(1);
}
