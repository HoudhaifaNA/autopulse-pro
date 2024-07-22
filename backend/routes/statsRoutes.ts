import express from "express";

import * as controller from "../controllers/statsController";

const router = express.Router();

router.get("/daily", controller.getDailyTransaction);
router.get("/stock", controller.getCarsStock);
router.get("/count", controller.getDocumentsCount);
router.get("/clients", controller.getClientsBalanaceStats);
router.get("/cars", controller.getCarsStats);
router.get("/licences", controller.getLicencesStats);
router.get("/transactions", controller.getTransactionsStats);
router.get("/expenses", controller.getExpensesStats);
router.get("/procurations", controller.getProcurationsStats);
router.get("/papers", controller.getPapersStats);

export default router;
