import { FormikHelpers } from "formik";

import { Values } from "components/CarForm/types";
import calcExpensesCosts from "utils/calcExpensesCosts";
import API from "utils/API";

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  context: any
) => {
  const { setModal, setNotification } = context;

  let {
    id,
    edit,
    step,
    created_at,
    type,
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
    costInEuros,
    euroPrice,
    purchasingPrice,
    expenses,
    totalExpensesCost,
    totalEurosAmount,
    totalCost,
  } = values;

  if (step < 6) actions.setFieldValue("step", step + 1);

  // Calculate purchasing price if car is imported
  if (step === 4 && type === "importé") {
    // PP ==> Purchasing Price
    const convertedPP = (Number(costInEuros) * Number(euroPrice)) / 100;
    actions.setFieldValue("purchasingPrice", convertedPP);
  }

  if (step === 5) {
    // Calculate total cost of every expense abroad in DA
    expenses.forEach((expense) => {
      const { type, euroCost, euroPrice } = expense;
      if (type === "à l'étranger")
        expense.totalCost = (Number(euroCost) * Number(euroPrice)) / 100;
    });

    // Calculate expenses DA cost and EURs amount
    let [expensesDAcost, expensesEURCost] = calcExpensesCosts(expenses);

    // Calculate total spent DA and EURs amount (car + expenses + licence )
    let totalEurosAmount = Number(costInEuros) + expensesEURCost;
    let totalCost = Number(purchasingPrice) + totalExpensesCost + owner.price;

    actions.setFieldValue("totalExpensesCost", expensesDAcost);
    actions.setFieldValue("totalEurosAmount", totalEurosAmount);
    actions.setFieldValue("totalCost", totalCost);
  }

  if (step === 6) {
    if (!costInEuros) {
      costInEuros = 0;
      euroPrice = 0;
    }
    if (!purchasingPrice) {
      purchasingPrice = 0;
    }

    try {
      const data = {
        type,
        brand,
        model,
        serialNumber,
        registrationNumber,
        keys,
        mileage,
        color,
        year,
        created_at,
        features,
        sellerId: seller.id,
        ownerId: owner.id,
        ownerName: owner.name,
        costInEuros,
        euroPrice,
        purchasingPrice,
        expenses,
        totalExpensesCost,
        totalEurosAmount,
        totalCost,
      };

      const method = edit ? "patch" : "post";
      const endpoint = edit ? `/cars/${id}` : "/cars";

      await API[method](endpoint, data);

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
