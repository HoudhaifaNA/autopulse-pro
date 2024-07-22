import express from "express";

import * as controller from "../controllers/transactionsController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllTransactions)
  .post(controller.createTransaction)
  .delete(controller.deleteAllTransactions);

router.route("/fiat/:currency").get(controller.getFiatTransactions);

router.route("/:id").get(controller.getTransactionById).patch(controller.updateTransaction);
router.delete("/:ids", controller.deleteTransactionsByIds);

export default router;
