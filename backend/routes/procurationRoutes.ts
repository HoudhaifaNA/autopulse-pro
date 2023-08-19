import express from "express";

import * as controller from "../controllers/procurationController";

const router = express.Router();

router
  .route("/")
  .get(controller.getProcurations)
  .post(controller.createProcuration)
  .delete(controller.deleteProcurations);

router
  .route("/:ids")
  .get(controller.getProcurationById)
  .patch(controller.updateProcuration)
  .delete(controller.deleteProcurationById);

export default router;
