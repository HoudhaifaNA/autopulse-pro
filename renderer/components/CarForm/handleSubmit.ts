import { mutate } from "swr";

import calcExpensesCosts from "utils/calcExpensesCosts";
import API from "utils/API";

import { Values } from "components/CarForm/types";
import { FormikSubmit } from "types";

const onSubmit: FormikSubmit<Values> = async (values, actions, context) => {
  const { setModal, setNotification } = context;
  let message = "";

  let {
    id,
    edit,
    repurchase,
    step,
    created_at,
    type,
    brand,
    model,
    serialNumber,
    registrationNumber,
    secondRegistrationNumber,
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
  } = values;

  if (step < 6) actions.setFieldValue("step", step + 1);

  // Calculate purchasing price if car is imported
  let convertedPP = Number(purchasingPrice);
  if (type !== "locale") {
    // PP ==> Purchasing Price
    convertedPP = (Number(costInEuros) * Number(euroPrice)) / 100;
  }
  // Calculate total cost of every expense abroad in DA
  expenses.forEach((expense) => {
    const { type, euroCost } = expense;
    if (type === "à l'étranger")
      expense.totalCost = (Number(euroCost) * Number(euroPrice)) / 100;
  });

  // Calculate expenses DA cost and EURs amount
  let [expensesDAcost, expensesEURCost] = calcExpensesCosts(expenses);

  // Calculate total spent DA and EURs amount (car + expenses + licence )
  let eurosSpent = Number(costInEuros) + expensesEURCost;

  let calculatedTotal = convertedPP + expensesDAcost + owner.price;

  actions.setFieldValue("purchasingPrice", convertedPP);
  actions.setFieldValue("totalExpensesCost", expensesDAcost);
  actions.setFieldValue("totalEurosAmount", eurosSpent);
  actions.setFieldValue("totalCost", calculatedTotal);

  if (step === 6 || step === 7) {
    if (!costInEuros) {
      costInEuros = 0;
      euroPrice = 100;
    }
    if (!purchasingPrice) purchasingPrice = 0;
    let calculatedTotal = convertedPP + expensesDAcost + owner.price;

    try {
      const data = {
        type,
        brand,
        model,
        serialNumber,
        registrationNumber,
        secondRegistrationNumber,
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
        purchasingPrice: convertedPP,
        expenses,
        totalExpensesCost: expensesDAcost,
        totalEurosAmount: eurosSpent,
        totalCost: calculatedTotal,
      };

      const method = edit && !repurchase ? "patch" : "post";
      const endpoint = edit && !repurchase ? `/cars/${id}` : "/cars";

      await API[method](endpoint, data);

      mutate("/cars");
      mutate("/cars/brands");
      mutate(`/cars/models?brand=${brand}`);
      mutate(`/cars/carBrand?brand=${brand}&serie=${year}`);
      mutate(`/cars/carBrand?brand=${brand}&serie=`);
      mutate(`/cars/carName?name=${brand} ${model}&serie=${year}`);
      mutate(`/cars/carName?name=${brand} ${model}&serie=`);
      edit && !repurchase ? mutate(`/cars/${id}`) : "";
      setModal("");
      message =
        edit && !repurchase ? "Voiture a été modifiée" : "Voiture a été créée";
      setNotification({ status: "success", message });
    } catch (err: any) {
      console.log(err);
      message = "Error";
      if (err.response) message = err.response.data.message;
      setNotification({ status: "error", message });
    }
    actions.setSubmitting(false);
  }
};

export default onSubmit;
