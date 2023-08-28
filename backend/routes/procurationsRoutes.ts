import express from "express";

import * as controller from "../controllers/procurationsController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllProcurations)
  .post(controller.createProcuration)
  .delete(controller.deleteAllProcurations);

router.route("/:id").get(controller.getProcurationById).patch(controller.updateProcuration);

router.delete("/:ids", controller.deleteProcurationsById);

export default router;
