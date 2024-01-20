import { Expense } from "interfaces";
import { AddModalPayload, ExpenseGrouped } from "types";

export const retreiveExpensesActions = (expense: Expense) => {
  const { id, expense_date, raison, cost, note } = expense;

  const UPDATE: AddModalPayload = {
    name: "expenses",
    title: `Modifier les informations de dépense ${raison}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        expense_date,
        raison,
        cost,
        note: note || "",
      },
    },
  };

  const DELETE: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `${raison} et toutes ses données`,
    resource: "expenses",
    idsToDelete: [id],
  };

  return { UPDATE, DELETE };
};
export const retreiveExpensesGroupActions = (expense: ExpenseGrouped) => {
  const { date_group } = expense;

  const DELETE: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `les dépenses de ${date_group}`,
    resource: "expenses",
    idsToDelete: [date_group],
  };

  return { DELETE };
};
