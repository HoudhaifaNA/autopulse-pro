import { FormikHelpers } from "formik";

import { Values } from "components/CarForm/types";
import calcExpensesCosts from "utils/calcExpensesCosts";
import API from "utils/API";

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setModal: any,
  setNotification: any
) => {
  const {
    step,
    created_at,
    carType,
    brand,
    model,
    serialNumber,
    registrationNumber,
    keys,
    mileage,
    color,
    year,
    features,
    owner,
    seller,
    euroCost,
    euroPrice,
    purchasingPrice,
    expenses,
  } = values;

  if (step < 6) actions.setFieldValue("step", step + 1);

  // Calculate purchasing price if car is imported
  if (step === 4 && carType === "importé") {
    // PP ==> Purchasing Price
    const convertedPP = (Number(euroCost) * Number(euroPrice)) / 100;
    actions.setFieldValue("purchasingPrice", convertedPP);
  }

  if (step === 5) {
    // Calculate total cost of every expense abroad in DZD
    expenses.forEach((expense) => {
      const { type, euroCost, euroPrice } = expense;
      if (type === "à l'étranger")
        expense.totalCost = (Number(euroCost) * Number(euroPrice)) / 100;
    });

    // Calculate expenses DZD and EUR amout
    let [expensesDZDcost, expensesEURCost] = calcExpensesCosts(expenses);

    // Calculate total spent DZD and EUR amout (car + expenses + licence )
    let euroAmount = Number(euroCost) + expensesEURCost;
    let dzdAmount = Number(purchasingPrice) + expensesDZDcost + owner.price;

    actions.setFieldValue("euroAmount", euroAmount);
    actions.setFieldValue("dzdAmount", dzdAmount);
  }
  if (step === 6) {
    let [expensesDZDcost] = calcExpensesCosts(expenses);

    try {
      const data = {
        created_at,
        type: carType,
        brand,
        model,
        serialNumber,
        registrationNumber,
        keys,
        mileage,
        color,
        year,
        features,
        sellerId: seller.id,
        ownerId: owner.id,
        ownerName: owner.name,
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
      setNotification({ status: "success", message: "Voiture a été créée" });
    } catch (err: any) {
      console.log(err.response.data.message);
      setNotification({ status: "error", message: err.response.data.message });
    }
    actions.setSubmitting(false);
  }
};

export default onSubmit;
