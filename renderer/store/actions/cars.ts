import { Car } from "interfaces";
import { Expense } from "page-components/cars/CarForm/types";
import { AddModalPayload } from "types";
import dateToString from "utils/dateToString";

const retreiveCarActions = (car: Car) => {
  const {
    id,
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
    seller,
    owner_id,
    owner_name,
    licence_price,
    purchase_price_eur,
    eur_exchange_rate,
    purchase_price_dzd,
    is_exchange,
    buyer,
    buyer_id,
    sold_at,
    sold_price,
    given_keys,
    selling_details,
  } = car;

  const expenses = JSON.parse(car.expenses) as Expense[];
  const exchange_types = typeof car.exchange_types === "string" ? JSON.parse(car.exchange_types) : null;

  const UPDATE: AddModalPayload = {
    name: "cars",
    title: `Modifier les informations de ${car.name} (${serial_number})`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
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
        seller,
        owner_id,
        owner_name,
        licence_price,
        purchase_price_eur,
        eur_exchange_rate,
        purchase_price_dzd,
        is_exchange,
        exchange_types,
        expenses,
      },
    },
  };
  const REPURCHASE: AddModalPayload = {
    name: "cars",
    title: `Rachat de ${car.name} (${serial_number})`,
    params: {
      isEdit: false,
      resourceId: 0,
      document: {
        purchased_at: dateToString(new Date()),
        type: "locale",
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
        seller_id: 0,
        seller: "",
        owner_id: null,
        owner_name: buyer || "",
        licence_price: 0,
        purchase_price_eur: 0,
        eur_exchange_rate: 0,
        purchase_price_dzd: 0,
        is_exchange: 0,
        exchange_types: null,
        expenses: [],
      },
    },
  };

  const SALE: AddModalPayload = {
    name: "sale",
    title: `Vendue ${car.name} (${serial_number})`,
    params: {
      isEdit: false,
      resourceId: id,
      document: {
        has_gray_card,
        has_procuration,
        papers_type,
      },
    },
  };
  const UPDATE_SALE: AddModalPayload = {
    name: "sale",
    title: `Modifier la vente de ${car.name} (${serial_number})`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        buyer,
        buyer_id,
        sold_at,
        sold_price,
        given_keys,
        has_gray_card,
        has_procuration,
        papers_type,
        selling_details: selling_details || "",
      },
    },
  };

  const CANCEL_SALE: AddModalPayload = {
    name: "cancel_sale",
    title: "Confirmer la suppression",
    message: `la vente de ${car.name} ${registration_number} (${serial_number})`,
    resource: "cars",
    idsToDelete: [id],
  };
  const DELETE: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `${car.name} ${registration_number} (${serial_number})`,
    resource: "cars",
    idsToDelete: [id],
  };

  return { UPDATE, REPURCHASE, SALE, UPDATE_SALE, CANCEL_SALE, DELETE };
};

export default retreiveCarActions;
