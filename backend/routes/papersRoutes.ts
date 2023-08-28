import express from "express";

import * as controller from "../controllers/papersController";

const router = express.Router();

router.route("/").get(controller.getAllPapers).post(controller.createPaper).delete(controller.deleteAllPapers);

router.route("/:id").get(controller.getPaperById).patch(controller.updatePaper);

router.delete("/:ids", controller.deletePapersById);

export default router;
