import path from "path";
import dotenv from "dotenv";

import app from "./app";

const envPath = path.join(path.resolve(), "server", ".env");
dotenv.config({ path: envPath, override: true });

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

export default server;
