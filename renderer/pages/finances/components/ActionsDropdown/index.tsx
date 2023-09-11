import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { AddModalPayload, Resources } from "types";
import { Transaction } from "interfaces";

interface ActionsDropdownProps {
  transaction: Transaction;
  resource: Resources;
}

const ActionsDropdown = ({ transaction, resource }: ActionsDropdownProps) => {
  const dispatch = useDispatch();
  const { id, transaction_date, client, client_id, info2, direction, currency, amount } = transaction;
  const ADD_EDIT_MODAL_PAYLOAD: AddModalPayload = {
    name: resource,
    title: `Modifier les informations de transaction`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        transaction_date,
        client,
        client_id,
        type: "Fiat",
        info1: "Argent",
        info2,
        direction,
        currency,
        amount: Math.abs(amount),
      },
    },
  };

  const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `cette transaction et toutes ses données`,
    resource,
    idsToDelete: [id],
  };

  return (
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem">
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
