import express from "express";

import * as controller from "../controllers/expenseController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllExpenses)
  .post(controller.createExpense)
  .delete(controller.deleteExpenses);

router
  .route("/:id")
  .get(controller.getExpenseById)
  .patch(controller.updateExpense)
  .delete(controller.deleteExpenseById);

export default router;
