import express from "express";

import * as controller from "../controllers/statsController";

const router = express.Router();

router.route("/counts").get(controller.getCounts);
router.route("/clients").get(controller.getClientsStats);
router.route("/cars").get(controller.getCarsStats);
router.route("/licences").get(controller.getLicencesStats);
router.route("/transactions").get(controller.getTransactionsStats);
router.route("/expenses").get(controller.getExpensesStats);

export default router;
