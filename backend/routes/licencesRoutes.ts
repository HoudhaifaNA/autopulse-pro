import express from "express";

import * as controller from "../controllers/licencesController";
import { confirmAction } from "../controllers/authController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllLicences)
  .post(controller.uploadAttachments, controller.createLicence)
  .delete(controller.deleteAllLicences);

router.get("/list", controller.getLicencesList);
router.route("/:id").get(controller.getLicenceById).patch(controller.updateLicence);
router.route("/:id/reserve").patch(confirmAction, controller.reserveLicence);

router.delete("/:ids", controller.deleteLicencesById);

export default router;
