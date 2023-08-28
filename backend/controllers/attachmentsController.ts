import path from "path";

import tryCatch from "../utils/tryCatch";

const attachmentController = tryCatch((req, res) => {
  const { filename } = req.params;

  const isProd: boolean = process.env.NODE_ENV === "production";
  let filePath = path.join(path.resolve(), "uploads", filename);
  if (isProd) {
    filePath = path.join(path.resolve(), "resources", "uploads", filename);
  }
  res.status(200).sendFile(filePath);
});

export default attachmentController;
