import express from "express";

import * as controller from "../controllers/papersController";

const router = express.Router();

router.route("/").get(controller.getAllPapers).post(controller.createPaper).delete(controller.deleteAllPapers);

router.route("/:id").get(controller.getPaperById).patch(controller.updatePaper);
router.route("/:id/deliver").patch(controller.deliverPaper).delete(controller.cancelPaperDelivery);

router.delete("/:ids", controller.deletePapersById);

export default router;
