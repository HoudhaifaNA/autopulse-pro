import express from "express";

import * as controller from "../controllers/statsController";

const router = express.Router();

router.route("/counts").get(controller.getCounts);

export default router;
