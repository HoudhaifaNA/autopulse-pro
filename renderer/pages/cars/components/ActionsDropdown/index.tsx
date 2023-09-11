import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { AddModalPayload } from "types";
import { Car } from "interfaces";
import { Expenses } from "../CarForm/types";
import dateToString from "utils/dateToString";

interface ActionsDropdownProps {
  car: Car;
}

const ActionsDropdown = ({ car }: ActionsDropdownProps) => {
  const dispatch = useDispatch();

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

  const expenses = JSON.parse(car.expenses) as Expenses[];
  const exchange_types = typeof car.exchange_types === "string" ? JSON.parse(car.exchange_types) : null;

  const ADD_EDIT_MODAL_PAYLOAD: AddModalPayload = {
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
  const ADD_REPURCHASE_MODAL_PAYLOAD: AddModalPayload = {
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

  const ADD_SALE_MODAL_PAYLOAD: AddModalPayload = {
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
  const ADD_UPDATE_SALE_MODAL_PAYLOAD: AddModalPayload = {
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

  const ADD_CANCEL_SALE_MODAL_PAYLOAD: AddModalPayload = {
    name: "cancel_sale",
    title: "Confirmer la suppression",
    message: `la vente de ${car.name} ${registration_number} (${serial_number})`,
    resource: "cars",
    idsToDelete: [id],
  };
  const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `${car.name} ${registration_number} (${serial_number})`,
    resource: "cars",
    idsToDelete: [id],
  };

  return (
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem">
      {!buyer_id && (
        <Button
          variant="ghost"
          icon="sell"
          onClick={() => {
            dispatch(addModal(ADD_SALE_MODAL_PAYLOAD));
          }}
        >
          Vendue
        </Button>
      )}
      {buyer_id && (
        <>
          <Button
            variant="ghost"
            icon="add"
            onClick={() => {
              dispatch(addModal(ADD_REPURCHASE_MODAL_PAYLOAD));
            }}
          >
            Rachat
          </Button>
          <Button
            variant="ghost"
            icon="sell"
            onClick={() => {
              dispatch(addModal(ADD_UPDATE_SALE_MODAL_PAYLOAD));
            }}
          >
            Modifier la vente
          </Button>
          <Button
            variant="ghost"
            icon="cancel"
            onClick={() => {
              dispatch(addModal(ADD_CANCEL_SALE_MODAL_PAYLOAD));
            }}
          >
            Annuler la vente
          </Button>
        </>
      )}
      <Button
        variant="ghost"
        icon="edit"
        onClick={() => {
          dispatch(addModal(ADD_EDIT_MODAL_PAYLOAD));
        }}
      >
        Modifier
      </Button>
      <Button
        variant="ghost"
        icon="delete"
        onClick={() => {
          dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
        }}
      >
        Supprimer
      </Button>
    </Dropdown>
  );
};

export default ActionsDropdown;
