import express from "express";

import * as controller from "../controllers/expenseController";

const router = express.Router();

router
  .route("/")
  .get(controller.getExpensesDays)
  .post(controller.createExpense)
  .delete(controller.deleteExpenses);

router
  .route("/date/:date")
  .get(controller.getExpensesByDate)
  .delete(controller.deleteExpenseByDate);

router
  .route("/:ids")
  .get(controller.getExpenseById)
  .patch(controller.updateExpense)
  .delete(controller.deleteExpenseById);

export default router;
