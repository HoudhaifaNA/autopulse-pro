import { FormikHelpers } from "formik";

import { Values } from "components/CarForm/types";
import calcExpensesCosts from "utils/calcExpensesCosts";

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  const {
    step,
    carType,
    euroCost,
    euroPrice,
    expenses,
    purchasingPrice,
    lisence,
  } = values;

  setTimeout(() => {
    console.log(values);
    actions.setSubmitting(false);
    actions.setFieldValue("step", step + 1);

    // Calculate purchasing price if car is imported
    if (step === 3 && carType === "importé") {
      // PP ==> Purchasing Price
      const convertedPP = euroCost * euroPrice;
      actions.setFieldValue("purchasingPrice", convertedPP);
    }

    if (step === 4) {
      // Calculate total cost of every expense abroad in DZD
      expenses.forEach((expense) => {
        const { type, euroCost, euroPrice } = expense;
        if (type === "À l'étranger") expense.totalCost = euroCost * euroPrice;
      });

      // Calculate expenses DZD and EUR amout
      const [expensesDZDcost, expensesEURCost] = calcExpensesCosts(expenses);

      // Calculate total spent DZD and EUR amout (car + expenses + lisence )
      const euroAmount = euroCost + expensesEURCost;
      const dzdAmount = purchasingPrice + expensesDZDcost + lisence.price;

      actions.setFieldValue("euroAmount", euroAmount);
      actions.setFieldValue("dzdAmount", dzdAmount);
    }
  }, 1000);
};

export default onSubmit;
