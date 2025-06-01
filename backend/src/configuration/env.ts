import dotenv from "dotenv";
dotenv.config();

export const env = {
  MONGO_URI: process.env.MONGO_URI!,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
};
