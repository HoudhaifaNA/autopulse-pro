import path from "path";

import dotenv from "dotenv";

const envFilePath = path.join(__dirname, "..", ".env");

const result = dotenv.config({ path: envFilePath });

if (result.error) {
  console.error("Error loading .env file:", result.error);
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

export { JWT_SECRET, JWT_EXPIRES_IN };
