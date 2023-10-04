import express from "express";

import * as controller from "../controllers/licencesController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllLicences)
  .post(controller.uploadAttachments, controller.createLicence)
  .delete(controller.deleteAllLicences);

router.get("/list/:filter", controller.getLicencesList);
router.route("/:id").get(controller.getLicenceById).patch(controller.updateLicence);

router.delete("/:ids", controller.deleteLicencesById);

export default router;
