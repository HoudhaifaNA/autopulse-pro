import express from "express";

import * as controller from "../controllers/licenceController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllLicences)
  .post(controller.createLicence)
  .delete(controller.deleteLicences);

router
  .route("/:id")
  .get(controller.getLicenceById)
  .patch(controller.updateLicence)
  .delete(controller.deleteLicenceById);

export default router;
