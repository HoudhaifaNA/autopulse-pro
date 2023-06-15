import { FormikHelpers } from "formik";

import { Values } from "components/CarForm/types";
import calcExpensesCosts from "utils/calcExpensesCosts";
import API from "utils/API";

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setModal: any
) => {
  const {
    step,
    carType,
    brand,
    serie,
    model,
    serialNumber,
    registrationNumber,
    color,
    year,
    licence,
    seller,
    euroCost,
    euroPrice,
    purchasingPrice,
    expenses,
  } = values;

  if (step < 5) actions.setFieldValue("step", step + 1);

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
      if (type === "à l'étranger") expense.totalCost = euroCost * euroPrice;
    });

    // Calculate expenses DZD and EUR amout
    let [expensesDZDcost, expensesEURCost] = calcExpensesCosts(expenses);

    // Calculate total spent DZD and EUR amout (car + expenses + licence )
    let euroAmount = euroCost + expensesEURCost;
    let dzdAmount = purchasingPrice + expensesDZDcost + licence.price;

    actions.setFieldValue("euroAmount", euroAmount);
    actions.setFieldValue("dzdAmount", dzdAmount);
  }
  if (step === 5) {
    let [expensesDZDcost] = calcExpensesCosts(expenses);

    try {
      const data = {
        type: carType,
        brand,
        serie,
        model,
        serialNumber,
        registrationNumber,
        color,
        year,
        sellerId: seller.id,
        licenceId: licence.id,
        costInEuros: euroCost,
        euroPrice,
        purchasingPrice,
        expenses,
        totalExpensesCost: expensesDZDcost,
        totalEurosAmount: values.euroAmount,
        totalCost: values.dzdAmount,
      };

      await API.post("/cars", { ...data });
      setModal("");
    } catch (err: any) {
      console.log(err.response.data.message);
    }
    actions.setSubmitting(false);
  }
};

export default onSubmit;
