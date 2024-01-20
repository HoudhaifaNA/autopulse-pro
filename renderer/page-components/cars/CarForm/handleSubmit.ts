import API from "utils/API";
import notify from "utils/notify";
import { CarInitialValues } from "./types";
import { SubmitFunction, SubmitStatus } from "types";
import { calculateTotalEURCost, calculateTotalExpenseCost } from "./utils";
import { AxiosError } from "axios";

interface Params {
  isEdit: boolean;
  resourceId: number;
}

const handleSubmit: SubmitFunction<CarInitialValues, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";

  const {
    purchased_at,
    type,
    brand,
    model,
    serial_number,
    registration_number,
    second_registration_number,
    color,
    production_year,
    keys,
    mileage,
    papers_type,
    has_procuration,
    has_gray_card,
    features,
    seller_id,
    owner_id,
    owner_name,
    purchase_price_eur,
    eur_exchange_rate,
    purchase_price_dzd,
    is_exchange,
    exchange_types,
    expenses,
  } = values;

  const expense_cost = calculateTotalExpenseCost(expenses);
  const euro_cost = calculateTotalEURCost(purchase_price_eur, expenses);

  try {
    const method = params?.isEdit ? "patch" : "post";
    const urlParams = params?.isEdit ? `/${params.resourceId}` : "";
    const notificationMessage = params?.isEdit
      ? "Voiture a été modifié avec succès."
      : "Voiture a été créé avec succès.";
    const data = {
      purchased_at,
      type,
      brand,
      model,
      serial_number,
      registration_number,
      second_registration_number,
      color,
      production_year,
      keys,
      mileage,
      papers_type: Array.isArray(papers_type) ? papers_type.join(",") : papers_type,
      has_procuration,
      has_gray_card,
      features,
      seller_id,
      owner_id,
      owner_name,
      purchase_price_eur,
      eur_exchange_rate,
      purchase_price_dzd,
      is_exchange,
      exchange_types,
      expenses,
      expense_cost,
      euro_cost,
    };

    await API[method](`/cars/${urlParams}`, data);
    notify("success", notificationMessage);
  } catch (err: any) {
    let message = "Error";
    if (err instanceof AxiosError && typeof err.response?.data.message === "string") {
      message = err.response.data.message;
    }
    notify("error", message);
    console.log(err);
    status = "error";
  }
  actions.setSubmitting(false);

  return status;
};

export { handleSubmit };
