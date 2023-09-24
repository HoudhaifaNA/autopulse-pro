import path from "path";

import dotenv from "dotenv";

const isProd: boolean = process.env.NODE_ENV === "production";
let envFilePath = path.join(path.resolve(), "env", ".env");
if (isProd) envFilePath = path.join(path.resolve(), "..", "..", "env/.env");

const result = dotenv.config({ path: envFilePath });

if (result.error) {
  console.error("Error loading .env file:", result.error);
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

export { JWT_SECRET, JWT_EXPIRES_IN };
