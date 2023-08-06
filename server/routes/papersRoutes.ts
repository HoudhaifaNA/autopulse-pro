import express from "express";

import * as controller from "../controllers/paperController";

const router = express.Router();

router
  .route("/")
  .get(controller.getPapers)
  .post(controller.createPaper)
  .delete(controller.deletePapers);

router
  .route("/:ids")
  .get(controller.getPaperById)
  .patch(controller.updatePaper)
  .delete(controller.deletePaperById);

export default router;
