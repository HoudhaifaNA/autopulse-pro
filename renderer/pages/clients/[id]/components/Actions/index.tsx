import { useDispatch } from "react-redux";

import * as S from "./styles";
import Button from "components/Button/Button";

import dateToString from "utils/dateToString";
import { AddModalPayload } from "types";
import { Client } from "interfaces";
import { addModal } from "store/reducers/modals";

interface ActionsProps {
  client: Client;
}
const Actions = ({ client }: ActionsProps) => {
  const dispatch = useDispatch();
  const { id, full_name, email, phone, address, dzd_balance, eur_balance } = client;
  const ADD_EDIT_MODAL_PAYLOAD: AddModalPayload = {
    name: "clients",
    title: `Modifier les informations de ${full_name}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        full_name,
        email,
        phone,
        address,
        dzd_balance,
        eur_balance,
      },
    },
  };
  const ADD_EURO_TRANSFER_MODAL_PAYLOAD: AddModalPayload = {
    name: "transactionsEUR",
    title: `Ajouter un virement euro`,
    params: {
      isEdit: false,
      resourceId: 0,
      document: {
        transaction_date: dateToString(new Date()),
        client: full_name,
        client_id: id,
        type: "Fiat",
        info1: "Argent",
        info2: "",
        direction: "entrante",
        currency: "EUR",
        amount: 0,
      },
    },
  };
  const ADD_DZD_TRANSFER_MODAL_PAYLOAD: AddModalPayload = {
    name: "transactionsDZD",
    title: `Ajouter un virement en dinars`,
    params: {
      isEdit: false,
      resourceId: 0,
      document: {
        transaction_date: dateToString(new Date()),
        client: full_name,
        client_id: id,
        type: "Fiat",
        info1: "Argent",
        info2: "",
        direction: "entrante",
        currency: "DZD",
        amount: 0,
      },
    },
  };

  const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `${full_name} et toutes ses données`,
    resource: "clients",
    idsToDelete: [id],
  };

  return (
    <S.ActionsList>
      <Button
        variant="primary"
        icon="euro"
        onClick={() => {
          dispatch(addModal(ADD_EURO_TRANSFER_MODAL_PAYLOAD));
        }}
      >
        Faire un virement en euros
      </Button>
      <Button
        variant="primary"
        icon="dinar"
        onClick={() => {
          dispatch(addModal(ADD_DZD_TRANSFER_MODAL_PAYLOAD));
        }}
      >
        Faire un virement en dinar
      </Button>
      <Button
        variant="primary"
        icon="edit"
        onClick={() => {
          dispatch(addModal(ADD_EDIT_MODAL_PAYLOAD));
        }}
      >
        Modifier
      </Button>
      <Button
        variant="primary"
        icon="delete"
        onClick={() => {
          dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
        }}
      >
        Supprimer
      </Button>
    </S.ActionsList>
  );
};

export default Actions;
