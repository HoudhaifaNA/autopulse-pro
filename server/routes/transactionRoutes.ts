import express from "express";

import * as controller from "../controllers/transactionController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllTransactions)
  .post(controller.createTransaction)
  .delete(controller.deleteTransactions);

router.delete(
  "/product",
  controller.deleteTransactionByProduct,
  controller.deleteTransactionById
);

router.get("/money", controller.getMoneyTransactions);

router
  .route("/:transactionId")
  .get(controller.getTransactionById)
  .delete(controller.deleteTransactionById);

router.get("/client/:clientId", controller.getTransactionsByClient);

export default router;
