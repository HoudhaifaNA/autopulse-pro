import { FormikHelpers } from "formik";

import { Values } from "components/CarForm/types";

const calculateTotalCost = (expenses: Values["expenses"]) => {
  return expenses.map((expense) => {
    let { type, euroCost, euroPrice } = expense;
    if (type === "À l'étranger") expense.totalCost = euroCost * euroPrice;
    return expense;
  });
};

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log(values);
    actions.setSubmitting(false);
    actions.setFieldValue("step", values.step + 1);

    // Calculate purchasing price if car is imported
    if (values.step === 3 && values.carType === "importé") {
      actions.setFieldValue(
        "purchasingPrice",
        values.euroCost * values.euroPrice
      );
    }
    if (values.step === 4) {
      const expensesWithTotalCost = calculateTotalCost(values.expenses);
      const dzdExpensesCost = expensesWithTotalCost.reduce((a, b) => {
        return a + b.totalCost;
      }, 0);
      const totalCost = values.purchasingPrice + dzdExpensesCost;
      actions.setFieldValue("expenses", expensesWithTotalCost);
      actions.setFieldValue("totalCost", totalCost);
    }
  }, 1000);
};

export default onSubmit;
