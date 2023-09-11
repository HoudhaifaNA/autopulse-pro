import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { AddModalPayload } from "types";
import { Client } from "interfaces";
import dateToString from "utils/dateToString";

interface ActionsDropdownProps {
  client: Client;
}

const ActionsDropdown = ({ client }: ActionsDropdownProps) => {
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
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem">
      {/* <Button variant="ghost" icon="print">
        Imprimer dernière transaction
      </Button>
      <Button variant="ghost" icon="print">
        Imprimer transactions en euros
      </Button>
      <Button variant="ghost" icon="print">
        Imprimer transactions en dinars
      </Button>
      <Button variant="ghost" icon="print">
        Imprimer toutes les transactions
      </Button> */}
      <Button
        variant="ghost"
        icon="euro"
        onClick={() => {
          dispatch(addModal(ADD_EURO_TRANSFER_MODAL_PAYLOAD));
        }}
      >
        Faire un virement en euros
      </Button>
      <Button
        variant="ghost"
        icon="dinar"
        onClick={() => {
          dispatch(addModal(ADD_DZD_TRANSFER_MODAL_PAYLOAD));
        }}
      >
        Faire un virement en dinar
      </Button>
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
