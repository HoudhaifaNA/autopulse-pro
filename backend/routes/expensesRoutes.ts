import express from "express";

import * as controller from "../controllers/expensesController";

const router = express.Router();

router.route("/").get(controller.getAllExpenses).post(controller.createExpense).delete(controller.deleteAllExpenses);

router.route("/group/:date").get(controller.getExpensesByGroup);

router.route("/:id").get(controller.getExpenseById).patch(controller.updateExpense);

router.delete("/:ids", controller.deleteExpensesById);

router.delete("/dates/:dates", controller.deleteExpensesByDate);

export default router;
