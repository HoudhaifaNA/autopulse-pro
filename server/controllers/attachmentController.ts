import path from "path";
import tryCatch from "../utils/tryCatch";

const attachmentController = tryCatch((req, res) => {
  const { filename } = req.params;

  const filePath = path.join(path.resolve(), "uploads", filename);

  res.status(200).sendFile(filePath);
});

export default attachmentController;
